import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { CoursesService } from '../../services/courses.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Location } from '@angular/common';
import { Course } from '../../model/course';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-course-form',
  templateUrl: './course-form.component.html',
  styleUrl: './course-form.component.scss',
})
export class CourseFormComponent implements OnInit {
  form = this.formBuilder.group({
    _id: new FormControl<String | null>(''),
    name: new FormControl<String | null>('', [
      Validators.required,
      Validators.minLength(3),
      Validators.maxLength(100),
      Validators.pattern(/^\S.*\S$/),
    ]),
    category: new FormControl<String | null>('', [Validators.required]),
  }); // Quando tem um grupo de campos

  constructor(
    private formBuilder: FormBuilder,
    private service: CoursesService,
    private snackBar: MatSnackBar,
    private location: Location,
    private route: ActivatedRoute
  ) {
    // this.form = this.formBuilder.group({
    //   name: new FormControl<String | null>(null),
    //   category: new FormControl<String | null>(null),
    // });
  }
  ngOnInit(): void {
    // this.form.value;

    const course: Course = this.route.snapshot.data['course'];
    this.form.setValue({
      _id: course._id,
      name: course.name, // Formulários tipados
      category: course.category,
    });
  }

  onSubmit() {
    if (this.form.valid) {
      this.service.save(this.form.value as Partial<Course>).subscribe(
        (result) => this.onSucess(),
        (error) => this.onError()
      );
    } else {
      this.onErrorAdd();
    }
  }

  onCancel() {
    this.location.back();
  }

  private onSucess() {
    this.snackBar.open('Curso salvo com sucesso!', '', { duration: 5000 });
    this.location.back();
  }
  private onError() {
    this.snackBar.open('Erro ao salvar curso!', '', { duration: 5000 });
  }
  private onErrorAdd() {
    this.snackBar.open('Erro ao tentar adicionar curso!', 'x', {
      duration: 5000,
    });
  }

  onErrorValidation(fieldName: string) {
    const field = this.form.get(fieldName);

    if (field?.hasError('required')) {
      return 'Campo obrigatório';
    }
    if (field?.hasError('minlength')) {
      const requiredLength = field.errors
        ? field.errors['minlength']['requiredLength']
        : 5;
      return `Tamanho mínimo precisa ser de ${requiredLength} caracteres`;
    }
    if (field?.hasError('maxlength')) {
      const requiredLength = field.errors
        ? field.errors['maxlength']['requiredLength']
        : 200;
      return `Tamanho máximo de ${requiredLength} caracteres excedido`;
    }
    return 'Campo inválido';
  }
}
