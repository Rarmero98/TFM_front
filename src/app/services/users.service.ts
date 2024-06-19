import { Injectable, inject } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { lastValueFrom, Observable } from 'rxjs';
import { IUser } from '../interfaces/iuser.interfaces';
import { environment } from '../../environments/environment.development';

type RegisterBody = {
  name: string;
  username: string;
  phone: number;
  email: string;
  password: string;
};

type LoginBody = {
  email: string;
  password: string;
};

type LoginResponse = {
  error?: string;
  message?: string;
  token?: string;
};

@Injectable({
  providedIn: 'root',
})
export class UsersService {
  private baseUrl: string = `${environment.apiUrl}/users`;

  private httpClient = inject(HttpClient);

  register(newUser: RegisterBody): Promise<IUser & string[]> {
    return lastValueFrom(
      this.httpClient.post<IUser & string[]>(
        `${this.baseUrl}/register`,
        newUser
      )
    );
  }
  login(body: LoginBody): Promise<LoginResponse> {
    return lastValueFrom(
      this.httpClient.post<LoginResponse>(`${this.baseUrl}/login`, body)
    );
  }


  private profileUrl = `${this.baseUrl}/profile`;

  //Obtener usuario para mostrar perfil   Hace falta token autenticacion??
  // getProfile(): Observable<IUser> {
  //   return this.httpClient.get<IUser>(this.profileUrl);
  // }
  getProfile(): Promise<IUser> {
    return lastValueFrom(this.httpClient.get<IUser>(this.profileUrl));
  }

  //Actualizar profile usuario   Hace falta token autenticacion??
  updateProfile(updatedUser: IUser): Observable<IUser> {
    return this.httpClient.put<IUser>(this.profileUrl, updatedUser);
  }

  //SUBIR IMAGEN USUARIO???
  uploadUserImage(userId: number, image: File) {
    const formData = new FormData();
    formData.append('image', image);

    return this.httpClient.post(`${this.baseUrl}/${userId}/upload-image`, formData);
  }

  //Eliminar cuenta usuario
  deleteUser(): Observable<IUser> {
    return this.httpClient.delete<IUser>(this.profileUrl);
  }

  // Método para obtener el token de autenticación
  private getToken(): string | null {
    return localStorage.getItem('authToken'); // Ajusta esto según donde guardes el token
  }

}
