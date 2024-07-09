import { Routes } from '@angular/router';
import { ClassroomComponent } from './components/classroom/web/classroom.component';
import { AppComponent } from './app.component';

export const routes: Routes = [
    {
        path: '',
        redirectTo: '/home',
        pathMatch: 'full'
    },
    {
        path: "home",
        component: AppComponent
    },
    {
        path: "classroom",
        component: ClassroomComponent
    },
];
