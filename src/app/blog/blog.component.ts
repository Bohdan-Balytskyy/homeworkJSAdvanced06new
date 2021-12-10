import { Component, OnInit } from '@angular/core';
import { BlogService } from '../blog.service';
import { Blog } from '../shared/interfaces/blog';

@Component({
  selector: 'app-blog',
  templateUrl: './blog.component.html',
  styleUrls: ['./blog.component.scss']
})
export class BlogComponent implements OnInit {

  blogs: Blog[];
  user: string = '';
  isEditPost: boolean = false;
  isAddPost: boolean = false;
  isSignIn: boolean = false;
  isSignUp: boolean = false;
  blogIndex: number;
  post = {
    title: '',
    text: ''
  };
  candidate = {
    username: '',
    email: '',
    password: ''
  };
  constructor(private blogservise: BlogService) { }
  
  ngOnInit(): void {
    this.getBlogs();
  }
  getBlogs(): void {
    this.blogs = this.blogservise.getBlogs();
  }
  addPost(): void {
    this.post = {
      title: '',
      text: ''
    };
    this.isAddPost = true
  }
  editPost(i: number):void {
    this.blogIndex = i;
    this.isEditPost = true
    this.post = {
      title: this.blogs[i].topic,
      text: this.blogs[i].message
    };
  }
  addOrEditBlog(): void {
    if (this.post.title === ''){
       alert('empty title field');
    } else if (this.post.text === '') {
      alert('empty text field');
    } else {
       if(this.isAddPost) this.blogservise.addBlog(this.post.title, this.post.text, this.user);
       if(this.isEditPost) this.blogservise.editBlog(this.blogIndex, this.post.title, this.post.text);
       this.getBlogs();
       this.isAddPost = false;
       this.isEditPost = false;
    }
  }
  deleteBlog(i: number): void {
    this.blogservise.deleteBlog(i);
    this.getBlogs();
  }
  clearCandidate(): void{
    this.candidate = {
      username: '',
      email: '',
      password: ''
    };
  }
  signIn():void {
    this.clearCandidate();
    this.isSignIn = true;
  }
  signUp(): void{
    this.clearCandidate();
    this.isSignUp = true;
  }
  submitSignIn():void {
    this.user = this.blogservise.checkSignIn(this.candidate.email, this.candidate.password);
    if(!this.user) alert('wrong email or password')
    this.isSignIn = this.user ==='';
  }
  submitSignUp(): void {
    if (this.candidate.username === '' || this.candidate.email === '' || this.candidate.password === '') {
      alert('fill in all the fields');  
    } else if (this.blogservise.checkSignUp(this.candidate.email, this.candidate.username)) {
      this.blogservise.addUser(this.candidate);
      this.user = this.candidate.username;
      this.isSignUp = false;
    } else {
      alert(`user with this ${this.blogservise.wrongField} is already exist`)
    }
  }
  
}
