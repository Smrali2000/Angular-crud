import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Classroom } from '../model/classroom.model';
import { ClassroomService } from '../service/classroom.service';
import { FormsModule } from '@angular/forms';
import { NgFor, NgIf } from '@angular/common';

@Component({
  selector: 'app-classroom',
  standalone: true,
  imports: [FormsModule, NgFor, NgIf],
  templateUrl: './classroom.component.html',
  styleUrl: './classroom.component.scss'
})
export class ClassroomComponent {
  constructor(private classroomService: ClassroomService, private router: Router) { }

  //Variables
  classroomData: any;
  classroomList: Classroom[] = [];
  // filteredClassroomList: Classroom[] = []; // New variable to hold filtered list
  searchQuery: string = '';
  isExtended: boolean = false;
  viewClassroom: boolean = false;
  isLoaded: boolean = false;
  isDeleted: boolean = false;
  isAddMode: boolean = false;
  isEditMode: boolean = false;
  resetClassroom: any = {};
  classroom: Classroom = {
    id: undefined,
    classroomName: "",
    classroomCode: "",
    totalStudents: 0
  };

  //to get the action menu
  expandMenu() {
    this.isExtended = !this.isExtended;
  }

  //redirect to home page
  redirectToHomePage() {
    if (this.isAddMode || this.isEditMode) {
      this.resetForm();
      this.isAddMode = false;
      this.isEditMode = false;
    }
    if (this.viewClassroom) {
      this.classroomData = '';
      this.viewClassroom = false;
    }
  }

  // Function to call the create form 
  addClassroom() {
    this.isAddMode = true
  }
  //Function to create a classroom
  createClassroom() {
    this.classroom.id = this.classroom.id;
    this.classroomService.createClassroom(this.classroom).subscribe({
      next: (data: Classroom) => {
        this.resetForm();
        alert('Classroom created successfully:');
        this.refreshClassroomList();
        this.isAddMode = false;
        this.viewClassroom = false;
        this.isEditMode = false;
      },
      error: (error) => {
        console.error('Error creating classroom:', error);
      },
    });
  }

  //function to call the classroom data in form fields to edit it
  editClassroom(id: any) {
    console.log(id)
    this.isEditMode = true;
    this.classroom.id = id;
    if (this.classroom.id) {
      this.classroomService.findClassroom(this.classroom.id).subscribe({
        next: (response: any) => {
          this.classroom = response
          this.isLoaded = true
        },
        error: (error) => {
          console.error('Error fetching classroom data:', error);
        }
      });
    }
  }

  //function to update the classroom
  updateClassroom() {
    var classroom = {
      id: this.classroom.id,
      classroomName: this.classroom.classroomName,
      classroomCode: this.classroom.classroomCode,
      totalStudents: this.classroom.totalStudents
    }
    this.classroomService.updateClassroom(classroom).subscribe({
      next: (response: any) => {
        this.resetForm();
        this.refreshClassroomList();
        alert("Data updated successfully")
        this.isEditMode = false;
      }
    })
  }

  //function to view the detail of Classroom data
  viewDetail(id: any) {
    this.viewClassroom = true
    this.classroomService.findClassroom(id).subscribe({
      next: (data: any) => {
        this.classroomData = data;
        this.isLoaded = true;
      }
    })
  }

  //function to delete a Classroom
  deleteClassroom(id: any): void {
    this.classroomService.deleteClassroom(id).subscribe({
      next: () => {
        this.refreshClassroomList();
        if (this.isDeleted) {
          alert(`Classroom with ${id} is deleted Successfully.`)
        }
      },
      error: (error: any) => {
        console.error('Error deleting classroom:', error);
      }
    });
  }

  ngOnInit(): void {
    this.refreshClassroomList();
  }

  //Get all the classrooms
  private refreshClassroomList(): void {
    this.classroomService.getAllClassrooms().subscribe({
      next: (response: any) => {
        console.log(JSON.stringify(response))
        this.classroomList = response;
        this.isDeleted = true;
      },
      error: (error: any) => {
        console.error('Error fetching classrooms:', error);
      }
    });
  }

  // Function to filter classrooms based on search query
  filterClassrooms(): void {
    this.classroomList = this.classroomList.filter((classroom: Classroom) =>
      classroom.classroomName.toLowerCase().includes(this.searchQuery.toLowerCase()) ||
      classroom.classroomCode.toLowerCase().includes(this.searchQuery.toLowerCase()) ||
      classroom.totalStudents.toString().includes(this.searchQuery)
    );
  }

  // Function to reset search query and display all classrooms
  resetSearch(): void {
    this.searchQuery = '';
    this.refreshClassroomList();
  }

  // Function to handle keyup event (backspace)
  onKeyUp(event: KeyboardEvent): void {
    if (event.key === 'Backspace') {
      this.filterClassrooms();
    }
  }

  //reset form fields
  resetForm() {
    this.classroom = {
      id: undefined,
      classroomName: '',
      classroomCode: '',
      totalStudents: 0
    }
  }

}

