import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-all-blogs',
  standalone: true,
  imports: [CommonModule, RouterModule, FormsModule],
  templateUrl: './all-blogs.component.html',
  styleUrls: ['./all-blogs.component.scss']
})
export class AllBlogsComponent implements OnInit {
  blogs: any[] = [];
  showView = false;
  selected: any = null;
  searchText = '';
  selectedTag = '';
  allTags: string[] = [];
  filteredBlogs: any[] = [];

  tagColors: { [key: string]: string } = {};

  constructor(private router: Router) {}

  ngOnInit() {
    this.loadBlogs();
  }
  
  loadBlogs() {
    const stored = JSON.parse(localStorage.getItem('blogs') || '[]');
    this.blogs = stored;
    this.allTags = [...new Set(this.blogs.flatMap(b => b.tags || []))];

    // Assign a random color for each tag
    const colors = ['#f44336', '#2196F3', '#4CAF50', '#FF9800', '#9C27B0', '#00BCD4'];
    this.tagColors = {};
    this.allTags.forEach((tag, i) => {
      this.tagColors[tag] = colors[i % colors.length];
    });

    this.applyFilters();
  }
  
  applyFilters() {
    this.filteredBlogs = this.blogs.filter(blog =>
      blog.title.toLowerCase().includes(this.searchText.toLowerCase()) &&
      (this.selectedTag ? (blog.tags || []).includes(this.selectedTag) : true)
    );
  }

  filterByTag(tag: string) {
    this.selectedTag = tag;
    this.applyFilters();
  }

  deleteBlog(id: number) {
    if (confirm('Are you sure you want to delete this blog?')) {
      this.blogs = this.blogs.filter(b => b.id !== id);
      localStorage.setItem('blogs', JSON.stringify(this.blogs));
      this.selectedTag = '';
      this.searchText = '';
      this.applyFilters();
    }
  }

  viewBlog(blog: any) {
    this.selected = blog;
    this.showView = true;
  }

  closeView() {
    this.showView = false;
    this.selected = null;
  }

  editBlog(blog: any) {
    this.router.navigate(['/edit', blog.id]);
  }

  addBlog() {
    // Navigate to your add blog page or form (adjust the path accordingly)
    this.router.navigate(['/add-blogs']);
  }
}
