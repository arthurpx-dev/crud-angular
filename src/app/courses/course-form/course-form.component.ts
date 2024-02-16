import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { CoursesService } from '../services/courses.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Location } from '@angular/common';
import { Course } from '../model/course';

@Component({
  selector: 'app-course-form',
  templateUrl: './course-form.component.html',
  styleUrl: './course-form.component.scss',
})
export class CourseFormComponent implements OnInit {
  form = this.formBuilder.group({
    name: new FormControl<String | null>(''),
    category: new FormControl<String | null>(''),
  }); // Quando tem um grupo de campos

  constructor(
    private formBuilder: FormBuilder,
    private service: CoursesService,
    private snackBar: MatSnackBar,
    private location: Location
  ) {
    // this.form = this.formBuilder.group({
    //   name: new FormControl<String | null>(null),
    //   category: new FormControl<String | null>(null),
    // });
  }
  ngOnInit(): void {
    // this.form.value;
  }

  onSubmit() {
    this.service.save(this.form.value as Partial<Course>).subscribe(
      (result) => this.onSucess(),
      (error) => this.onError()
    );
  }

  onCancel() {
    this.location.back();
  }

  private onSucess() {
    this.snackBar.open('Curso Salvo com sucesso!', '', { duration: 5000 });
    this.location.back();
  }
  private onError() {
    this.snackBar.open('Erro ao salvar curso!', '', { duration: 5000 });
  }
}
