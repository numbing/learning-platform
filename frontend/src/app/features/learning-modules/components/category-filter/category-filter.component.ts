import { Component, Output, EventEmitter } from '@angular/core';

import { Category, CategoryEnum } from '../../models/category.enum';

@Component({
    selector: 'app-category-filter',
    imports: [],
    templateUrl: './category-filter.component.html',
    styleUrls: ['./category-filter.component.css']
})
export class CategoryFilterComponent {
  @Output() categoryChange = new EventEmitter<Category | null>();

  readonly categories: (Category | null)[] = [
    null,
    CategoryEnum.AI,
    CategoryEnum.Sustainability,
    CategoryEnum.DigitalSkills,
  ];

  selectedCategory: Category | null = null;

  onCategoryChange(event: Event): void {
    const select = event.target as HTMLSelectElement;
    const value = select.value;
    this.selectedCategory = value === 'all' ? null : (value as Category);
    this.categoryChange.emit(this.selectedCategory);
  }

  getCategoryLabel(category: Category | null): string {
    if (category === null) {
      return 'All Categories';
    }
    return category;
  }

  getCategoryValue(category: Category | null): string {
    return category === null ? 'all' : category;
  }
}
