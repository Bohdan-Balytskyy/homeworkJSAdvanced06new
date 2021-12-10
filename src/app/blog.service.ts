import { Injectable } from '@angular/core';
import { Blog } from './shared/interfaces/blog';
import { User } from './shared/interfaces/user';

@Injectable({
  providedIn: 'root'
})
export class BlogService {

  blogs: Blog[] = [{
    id: 1,
    topic: 'First post',
    message: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Reiciendis, a libero. Nemo dolorem corporis culpa iusto! Voluptas, impedit aliquam. Consectetur cumque suscipit nihil blanditiis quasi! Voluptatibus a itaque illo ea?',
    postedBy: 'admin',
    date: new Date,
  }]; 
  users: User[] = [{
    id: 1,
    username: 'admin',
    email: 'admin@gmail.com',
    password: 'admin'
  }];
  wrongField: string;

  constructor() { }

  getBlogs(): Blog[]{
    return this.blogs;
  }
  addBlog(topic: string, message: string,  postedBy: string): void{
    const id = this.blogs.length === 0 ? 1 : this.blogs.slice(-1)[0].id + 1;
    const date = new Date();
    this.blogs.push({ message, topic, postedBy, date, id});
  }
  deleteBlog(i:number):void {
    this.blogs.splice(i, 1);
  }
  editBlog(i: number, topic: string, message: string,):void {
    this.blogs[i].message = message;
    this.blogs[i].topic = topic;
  }
  checkSignIn(email:string, password:string):string {
    for (const iterator of this.users) {
      if (email === iterator.email && password === iterator.password) {
        return iterator.username;
      }
    }
    return '';
  }
  checkSignUp(email: string, username: string):boolean {
    for (const iterator of this.users) {
      if (username === iterator.username) {
        this.wrongField = 'username';
        return false;
      }
      if (email === iterator.email) {
        this.wrongField = 'email';
        return false;
      }
    }
    return true;
  }
  addUser(user: User): void{
    user.id = this.users.length === 0 ? 1 : this.users.slice(-1)[0].id + 1;
    this.users.push(user);
  }
}
