import { Component, OnInit } from '@angular/core';
import { Course } from '../../model/course';
import { CoursesService } from '../../services/courses.service';
import { Observable, catchError, of } from 'rxjs';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { ErrorDialogComponent } from '../../../shared/components/error-dialog/error-dialog.component';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ConfirmationDialogComponent } from '../../../shared/components/confirmation-dialog/confirmation-dialog.component';
@Component({
  selector: 'app-courses',
  templateUrl: './courses.component.html',
  styleUrl: './courses.component.scss',
})
export class CoursesComponent implements OnInit {
  courses$: Observable<Course[]> | null = null;

  constructor(
    private courseService: CoursesService,
    private router: Router,
    private route: ActivatedRoute,
    public dialog: MatDialog,
    private snackBar: MatSnackBar
  ) {
    this.refresh();
  }

  ngOnInit(): void {}

  refresh() {
    this.courses$ = this.courseService.list().pipe(
      catchError((error) => {
        console.error(error);
        this.onError('Erro ao carregar cursos.');
        return of([]);
      })
    );
  }

  onAdd() {
    this.router.navigate(['new'], { relativeTo: this.route }); // Opção extra
  }

  onDelete(course: Course) {
    const dialogRef = this.dialog.open(ConfirmationDialogComponent, {
      data: 'Tem certeza que deseja remover esse curso? ',
    });

    dialogRef.afterClosed().subscribe((result: boolean) => {
      if (result) {
        this.courseService.delete(course._id).subscribe(
          () => {
            this.refresh();
            this.snackBar.open('Curso removido com sucesso!', 'x', {
              duration: 5000,
              verticalPosition: 'top',
              horizontalPosition: 'center',
            });
          },
          () => this.onError('Erro ao tentar remover curso.')
        );
      }
    });
  }

  onEdit(course: Course) {
    this.router.navigate(['edit', course._id], { relativeTo: this.route });
  }

  onError(errorMsg: string) {
    this.dialog.open(ErrorDialogComponent, {
      data: errorMsg,
    });
  }
}
