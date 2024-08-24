import { Component, OnInit } from '@angular/core';
import { GroupService } from './group.service';
import { Group, Activity } from './group.model';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Observable, of, from } from 'rxjs';
import { SafeUrlPipe } from '../../shared/safe-url.pipe';
import { BudgetComponent } from './budget/budget.component';
import { ChatComponent } from './chat/chat.component';
import { StoriesComponent } from './stories/stories.component';
import { TicketsComponent } from './tickets/tickets.component';
import { AuthService } from '../../auth/auth.service';

@Component({
  selector: 'app-groups',
  standalone: true,
  imports: [
    FormsModule,
    CommonModule,
    SafeUrlPipe,
    BudgetComponent,
    ChatComponent,
    StoriesComponent,
    TicketsComponent,
  ],
  templateUrl: './groups.component.html',
  styleUrls: ['./groups.component.css'],
})
export class GroupsComponent implements OnInit {
  groupName: string = '';
  destination: string = '';
  userEmail: string = '';
  groups!: Observable<Group[]>;
  showCreateGroupForm: boolean = false;
  showAddUserForm: boolean = false;
  showUpdateGroupForm: boolean = false;
  selectedGroup: Group | null = null;
  currentSection: string = 'home';
  selectedActivityIndex: number | null = null;
  fileUrl$: Observable<string> = of('');

  constructor(
    private groupService: GroupService,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    this.groups = this.groupService.getUserGroups();
  }

  toggleCreateGroupForm() {
    this.showCreateGroupForm = !this.showCreateGroupForm;
  }

  toggleAddUserForm() {
    this.showAddUserForm = !this.showAddUserForm;
  }

  toggleUpdateGroupForm() {
    this.showUpdateGroupForm = !this.showUpdateGroupForm;
  }

  createGroup() {
    const group: Group = {
      name: this.groupName,
      destination: this.destination,
      members: [],
      activities: [],
      profilePhoto: 'assets/img/defaultProfilPhoto.png',
      documents: [],
      tickets: [],
      vaccination: [],
      assurance: [],
    };
    this.groupService.createGroup(group).then(() => {
      this.groupName = '';
      this.destination = '';
      this.showCreateGroupForm = false;
    });
  }

  addUserToGroup() {
    if (this.selectedGroup && this.userEmail) {
      this.groupService
        .addUserToGroupByEmail(this.selectedGroup.id!, this.userEmail)
        .then(() => {
          this.selectedGroup!.members.push(this.userEmail);
          this.userEmail = '';
          this.showAddUserForm = false;
        })
        .catch((error) => {
          console.error("Erreur lors de l'ajout de l'utilisateur:", error);
        });
    }
  }

  removeMember(index: number) {
    if (this.selectedGroup) {
      this.selectedGroup.members.splice(index, 1);
    }
  }

  addActivity() {
    if (this.selectedGroup) {
      if (!this.selectedGroup.activities) {
        this.selectedGroup.activities = [];
      }
      this.selectedGroup.activities.push({
        name: '',
        photo: '',
        address: '',
        price: 0,
      });
    }
  }

  removeActivity(index: number) {
    if (this.selectedGroup && this.selectedGroup.activities) {
      this.selectedGroup.activities.splice(index, 1);
    }
  }

  updateGroup() {
    if (this.selectedGroup) {
      this.groupService
        .updateGroupParameters(this.selectedGroup.id!, this.selectedGroup)
        .then(() => {
          this.showUpdateGroupForm = false;
        })
        .catch((error) => {
          console.error('Erreur lors de la mise à jour du groupe:', error);
        });
    }
  }

  updateActivity(index: number) {
    if (this.selectedGroup && this.selectedGroup.activities) {
      const updatedActivity = this.selectedGroup.activities[index];
      this.groupService
        .updateGroupParameters(this.selectedGroup.id!, {
          activities: [...this.selectedGroup.activities],
        })
        .then(() => {
          // Handle post-update logic here if needed
        })
        .catch((error) => {
          console.error("Erreur lors de la mise à jour de l'activité:", error);
        });
    }
  }

  selectGroup(group: Group) {
    this.selectedGroup = group;
  }

  deselectGroup() {
    this.selectedGroup = null;
    this.showAddUserForm = false;
    this.showUpdateGroupForm = false;
  }

  showSection(section: string) {
    this.currentSection = section;
  }

  async handleFileChange(
    event: Event,
    fileType: 'documents' | 'tickets' | 'vaccination' | 'assurance'
  ) {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files[0] && this.selectedGroup) {
      const file = input.files[0];
      try {
        const url = await this.groupService.uploadFile(
          this.selectedGroup.id!,
          fileType,
          file
        );
        if (this.selectedGroup) {
          const filesArray = this.selectedGroup[fileType] || [];
          filesArray.push(url);
          await this.groupService.updateGroupParameters(
            this.selectedGroup.id!,
            {
              [fileType]: filesArray,
            }
          );
        }
      } catch (error) {
        console.error(
          'Erreur lors du téléversement ou de la mise à jour du groupe',
          error
        );
      }
    }
  }

  getFileExtension(fileUrl: string): string {
    return fileUrl.split('.').pop()?.toLowerCase() || '';
  }

  handleProfilePhotoChange(event: Event) {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files[0] && this.selectedGroup) {
      const reader = new FileReader();
      reader.onload = (e: any) => {
        this.selectedGroup!.profilePhoto = e.target.result;
        this.groupService.updateGroupParameters(this.selectedGroup!.id!, {
          profilePhoto: e.target.result,
        });
      };
      reader.readAsDataURL(input.files[0]);
    }
  }

  getFileName(url: string): string {
    // Decode the URL to get a more readable format
    const decodedUrl = decodeURIComponent(url);

    // Extract the filename from the decoded URL
    const parts = decodedUrl.split('/');
    const fileNameWithToken = parts[parts.length - 1];

    // Remove any query parameters if present
    const fileName = fileNameWithToken.split('?')[0];

    return fileName;
  }
}
