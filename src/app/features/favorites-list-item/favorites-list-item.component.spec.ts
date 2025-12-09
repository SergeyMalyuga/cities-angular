import {ComponentFixture, TestBed} from '@angular/core/testing';

import {FavoritesListItemComponent} from './favorites-list-item.component';

describe('FavoritesListItemComponent', () => {
  let component: FavoritesListItemComponent;
  let fixture: ComponentFixture<FavoritesListItemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FavoritesListItemComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(FavoritesListItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
