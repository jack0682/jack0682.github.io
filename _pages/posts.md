---
layout: single
title: "Posts - Archive of Thoughts"
permalink: /posts/
author_profile: true
toc: true
toc_sticky: true
---

> *"Writing is not mere documentation. It is the process by which layers of existence  
> accumulate through time, and each piece forms constellations of thought  
> that lead us to yet another question."*

---

## 📖 All Posts by Time

{% assign posts_by_year = site.posts | group_by_exp: "post", "post.date | date: '%Y'" %}
{% for year_group in posts_by_year %}

<div class="year-card">
  <h3 class="year-title">🗓️ Thoughts from {{ year_group.name }}</h3>
  
  {% assign posts_by_month = year_group.items | group_by_exp: "post", "post.date | date: '%m'" %}
  {% for month_group in posts_by_month %}
  
  <div class="month-section">
    <h4 class="month-title">{{ month_group.first.date | date: "%B" }}</h4>
    
    <div class="posts-grid">
      {% for post in month_group.items %}
      <div class="post-card">
        <div class="post-header">
          <h5 class="post-title"><a href="{{ post.url }}">{{ post.title }}</a></h5>
          <span class="post-date">{{ post.date | date: "%B %d, %Y" }}</span>
        </div>
        {% if post.excerpt %}
        <div class="post-excerpt">{{ post.excerpt | strip_html | truncate: 120 }}</div>
        {% endif %}
        <div class="post-tags">
          {% for tag in post.tags %}
          <span class="tag">#{{ tag }}</span>
          {% endfor %}
        </div>
      </div>
      {% endfor %}
    </div>
  </div>
  {% endfor %}
</div>

{% endfor %}

---

## 🏷️ Posts by Tags

<div class="tags-card">
  <h3 class="card-title">📋 Navigate by Tags</h3>
  
  {% assign all_tags = site.tags | sort %}
  <div class="tags-grid">
    {% for tag in all_tags %}
    <div class="tag-group">
      <div class="tag-header">
        <strong>{{ tag[0] }}</strong>
        <span class="count-badge">{{ tag[1].size }}</span>
      </div>
      <div class="tag-posts">
        {% for post in tag[1] limit:3 %}
        <div class="mini-post">
          <a href="{{ post.url }}">{{ post.title }}</a>
          <span class="mini-date">{{ post.date | date: "%b %d, %Y" }}</span>
        </div>
        {% endfor %}
        {% if tag[1].size > 3 %}
        <div class="more-posts">... and {{ tag[1].size | minus: 3 }} more</div>
        {% endif %}
      </div>
    </div>
    {% endfor %}
  </div>
</div>

---

## 📂 Posts by Categories

<div class="categories-card">
  <h3 class="card-title">🗂️ Structured Thoughts</h3>
  
  {% assign all_categories = site.categories | sort %}
  <div class="categories-list">
    {% for category in all_categories %}
    <div class="category-section">
      <div class="category-header">
        <h4>{{ category[0] | capitalize }}</h4>
        <span class="count-badge">{{ category[1].size }} post{% if category[1].size > 1 %}s{% endif %}</span>
      </div>
      
      <div class="category-posts">
        {% for post in category[1] %}
        <div class="category-post-item">
          <a href="{{ post.url }}" class="post-link">{{ post.title }}</a>
          <span class="post-meta">{{ post.date | date: "%B %d, %Y" }}</span>
        </div>
        {% endfor %}
      </div>
    </div>
    {% endfor %}
  </div>
</div>

---

## 📊 Archive Statistics

<div class="stats-card">
  <h3 class="card-title">📈 Archive Overview</h3>
  
  <div class="stats-grid">
    <div class="stat-item">
      <div class="stat-number">{{ site.posts.size }}</div>
      <div class="stat-label">Total Posts</div>
    </div>
    <div class="stat-item">
      <div class="stat-number">{{ site.tags.size }}</div>
      <div class="stat-label">Tags</div>
    </div>
    <div class="stat-item">
      <div class="stat-number">{{ site.categories.size }}</div>
      <div class="stat-label">Categories</div>
    </div>
    <div class="stat-item">
      <div class="stat-number">{{ site.posts.first.date | date: "%Y" }}</div>
      <div class="stat-label">Last Updated</div>
    </div>
  </div>
  
  <div class="last-updated">
    <strong>Most Recent:</strong> {{ site.posts.first.date | date: "%B %d, %Y" }}
  </div>
</div>

---

## 🔄 Circulation of Thoughts

<div class="circulation-card">
  <h3 class="card-title">🌊 Recent Flow</h3>
  
  <div class="recent-section">
    <h4>Latest 5 Posts</h4>
    <div class="recent-posts">
      {% for post in site.posts limit:5 %}
      <div class="recent-post-item">
        <a href="{{ post.url }}" class="recent-title">{{ post.title }}</a>
        <span class="recent-date">{{ post.date | date: "%b %d, %Y" }}</span>
      </div>
      {% endfor %}
    </div>
  </div>
  
  <div class="origin-section">
    <h4>Origin Point</h4>
    {% assign first_post = site.posts.last %}
    <div class="origin-post">
      <a href="{{ first_post.url }}" class="origin-title">{{ first_post.title }}</a>
      <span class="origin-date">{{ first_post.date | date: "%b %d, %Y" }}</span>
    </div>
  </div>
</div>

---

<div class="update-notice">
  <em>This sitemap automatically updates whenever new posts are published.<br>
  Each post is dynamically connected through Jekyll's Liquid templating system.</em>
</div>

<style>
/* Card Layouts */
.year-card, .tags-card, .categories-card, .stats-card, .circulation-card {
  background: #ffffff;
  border-radius: 12px;
  padding: 1.5rem;
  margin: 2rem 0;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  border: 1px solid #e5e7eb;
}

.card-title, .year-title {
  color: #1f2937;
  margin-bottom: 1rem;
  padding-bottom: 0.5rem;
  border-bottom: 2px solid #3b82f6;
}

/* Month Sections */
.month-section {
  margin-bottom: 2rem;
}

.month-title {
  color: #4b5563;
  margin-bottom: 1rem;
  font-size: 1.1rem;
}

.posts-grid {
  display: grid;
  gap: 1rem;
}

.post-card {
  background: #f9fafb;
  border-radius: 8px;
  padding: 1rem;
  border-left: 4px solid #3b82f6;
  transition: transform 0.2s;
}

.post-card:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.15);
}

.post-header {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 0.5rem;
}

.post-title {
  margin: 0;
  font-size: 1rem;
  flex: 1;
  margin-right: 1rem;
}

.post-title a {
  color: #1f2937;
  text-decoration: none;
  font-weight: 600;
}

.post-title a:hover {
  color: #3b82f6;
}

.post-date {
  color: #6b7280;
  font-size: 0.85rem;
  white-space: nowrap;
}

.post-excerpt {
  color: #4b5563;
  font-size: 0.9rem;
  line-height: 1.4;
  margin-bottom: 0.75rem;
}

.post-tags {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
}

.tag {
  background: #dbeafe;
  color: #1e40af;
  padding: 0.25rem 0.5rem;
  border-radius: 4px;
  font-size: 0.75rem;
  font-weight: 500;
}

/* Tags Grid */
.tags-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 1rem;
}

.tag-group {
  background: #f3f4f6;
  padding: 1rem;
  border-radius: 8px;
}

.tag-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 0.75rem;
}

.count-badge {
  background: #3b82f6;
  color: white;
  padding: 0.25rem 0.5rem;
  border-radius: 12px;
  font-size: 0.75rem;
  font-weight: 600;
}

.tag-posts {
  space-y: 0.5rem;
}

.mini-post {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0.5rem 0;
  border-bottom: 1px solid #e5e7eb;
}

.mini-post:last-child {
  border-bottom: none;
}

.mini-post a {
  color: #374151;
  text-decoration: none;
  font-size: 0.9rem;
  flex: 1;
  margin-right: 0.5rem;
}

.mini-post a:hover {
  color: #3b82f6;
}

.mini-date {
  color: #9ca3af;
  font-size: 0.8rem;
  white-space: nowrap;
}

.more-posts {
  color: #6b7280;
  font-style: italic;
  font-size: 0.85rem;
  text-align: center;
  padding-top: 0.5rem;
}

/* Categories */
.categories-list {
  space-y: 1.5rem;
}

.category-section {
  border-bottom: 1px solid #e5e7eb;
  padding-bottom: 1rem;
}

.category-section:last-child {
  border-bottom: none;
}

.category-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1rem;
}

.category-header h4 {
  margin: 0;
  color: #1f2937;
}

.category-posts {
  display: grid;
  gap: 0.5rem;
}

.category-post-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0.5rem;
  background: #f9fafb;
  border-radius: 6px;
}

.post-link {
  color: #374151;
  text-decoration: none;
  font-weight: 500;
  flex: 1;
  margin-right: 1rem;
}

.post-link:hover {
  color: #3b82f6;
}

.post-meta {
  color: #9ca3af;
  font-size: 0.85rem;
  white-space: nowrap;
}

/* Statistics */
.stats-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(120px, 1fr));
  gap: 1rem;
  margin-bottom: 1rem;
}

.stat-item {
  text-align: center;
  padding: 1rem;
  background: #f3f4f6;
  border-radius: 8px;
}

.stat-number {
  font-size: 2rem;
  font-weight: 700;
  color: #3b82f6;
  line-height: 1;
}

.stat-label {
  color: #6b7280;
  font-size: 0.85rem;
  margin-top: 0.5rem;
}

.last-updated {
  text-align: center;
  padding: 1rem;
  background: #eff6ff;
  border-radius: 6px;
  color: #1e40af;
}

/* Circulation */
.recent-section, .origin-section {
  margin-bottom: 1.5rem;
}

.recent-section h4, .origin-section h4 {
  color: #4b5563;
  margin-bottom: 0.75rem;
}

.recent-posts {
  display: grid;
  gap: 0.5rem;
}

.recent-post-item, .origin-post {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0.75rem;
  background: #f9fafb;
  border-radius: 6px;
  border-left: 3px solid #3b82f6;
}

.recent-title, .origin-title {
  color: #374151;
  text-decoration: none;
  font-weight: 500;
  flex: 1;
  margin-right: 1rem;
}

.recent-title:hover, .origin-title:hover {
  color: #3b82f6;
}

.recent-date, .origin-date {
  color: #9ca3af;
  font-size: 0.85rem;
  white-space: nowrap;
}

/* Update Notice */
.update-notice {
  text-align: center;
  color: #6b7280;
  font-size: 0.9rem;
  padding: 1rem;
  background: #f9fafb;
  border-radius: 6px;
  margin-top: 2rem;
}

/* Responsive Design */
@media (max-width: 768px) {
  .post-header {
    flex-direction: column;
    align-items: flex-start;
  }
  
  .post-title {
    margin-right: 0;
    margin-bottom: 0.5rem;
  }
  
  .tags-grid {
    grid-template-columns: 1fr;
  }
  
  .stats-grid {
    grid-template-columns: repeat(2, 1fr);
  }
  
  .category-post-item, .recent-post-item {
    flex-direction: column;
    align-items: flex-start;
  }
  
  .post-link, .recent-title {
    margin-right: 0;
    margin-bottom: 0.25rem;
  }
}
</style>
