import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, NgForm } from '@angular/forms';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { QuillModule } from 'ngx-quill';

@Component({
  selector: 'app-add-blogs',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule, QuillModule],
  templateUrl: './add-blogs.component.html',
  styleUrls: ['./add-blogs.component.scss']
})
export class AddBlogsComponent implements OnInit {
  blogTitle = '';
  blogContent = '';
  blogTags = ''; // comma-separated tags
  editMode = false;
  blogId: number | null = null;

  quillModules = {
    toolbar: [
      ['bold', 'italic', 'underline', 'strike'],
      ['blockquote', 'code-block'],
      [{ header: 1 }, { header: 2 }],
      [{ list: 'ordered' }, { list: 'bullet' }],
      [{ script: 'sub' }, { script: 'super' }],
      [{ indent: '-1' }, { indent: '+1' }],
      [{ direction: 'rtl' }],
      [{ size: ['small', false, 'large', 'huge'] }],
      [{ header: [1, 2, 3, 4, 5, 6, false] }],
      [{ color: [] }, { background: [] }],
      [{ font: [] }],
      [{ align: [] }],
      ['link', 'image', 'video'],
      ['clean']
    ]
  };

  constructor(private router: Router, private route: ActivatedRoute) {}

  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      const blogs = JSON.parse(localStorage.getItem('blogs') || '[]');
      const found = blogs.find((b: any) => String(b.id) === id);
      if (found) {
        this.editMode = true;
        this.blogId = found.id;
        this.blogTitle = found.title;
        this.blogContent = found.content;
        this.blogTags = found.tags?.join(', ') || '';
      }
    }
  }

  saveBlog(form: NgForm) {
    if (form.invalid) {
      form.control.markAllAsTouched();
      return;
    }

    const tagsArray = this.blogTags
      .split(',')
      .map(t => t.trim().toLowerCase())
      .filter(t => t);

    let blogs = JSON.parse(localStorage.getItem('blogs') || '[]');

    if (this.editMode && this.blogId != null) {
      blogs = blogs.map((b: any) =>
        b.id === this.blogId
          ? { ...b, title: this.blogTitle, content: this.blogContent, tags: tagsArray, updatedAt: new Date().toISOString() }
          : b
      );
    } else {
      blogs.push({
        id: Date.now(),
        title: this.blogTitle,
        content: this.blogContent,
        tags: tagsArray,
        createdAt: new Date().toISOString()
      });
    }

    localStorage.setItem('blogs', JSON.stringify(blogs));
    this.router.navigate(['/all-blogs']);
  }

  cancel() {
    this.router.navigate(['/all-blogs']);
  }
}
