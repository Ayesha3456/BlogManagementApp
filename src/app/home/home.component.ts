import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  recent: any[] = [];

  ngOnInit() {
    this.loadRecent();
  }

  loadRecent() {
    const blogs = JSON.parse(localStorage.getItem('blogs') || '[]');
    this.recent = blogs.slice().reverse().slice(0, 3); // latest 3
  }

  excerpt(html: string, limit = 140) {
    const div = document.createElement('div');
    div.innerHTML = html || '';
    const text = (div.textContent || div.innerText || '').trim();
    return text.length > limit ? text.slice(0, limit) + '...' : text;
  }
}
