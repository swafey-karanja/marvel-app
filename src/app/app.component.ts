import { Component } from '@angular/core';
// import { RouterOutlet } from '@angular/router';
import { MarvelService } from './services/marvel.service';
import { NgFor, NgIf } from '@angular/common';
import { FormsModule, NgForm } from '@angular/forms';
import { animate, style, transition, trigger } from '@angular/animations';

@Component({
  selector: 'app-root',
  imports: [NgFor, FormsModule, NgIf],
  providers: [MarvelService],
  animations: [
    trigger('fadeIn', [
      transition(':enter', [
        style({ opacity: 0, transform: 'translateY(-20px)' }),
        animate('300ms ease-in', style({ opacity: 1, transform: 'translateY(0)' })),
      ]),
    ]),
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'marvel-app';

  constructor(private marvelService: MarvelService) {}

  characters: any[] = [];
  character: any = null;
  comics: any[] = [];
  comicBooks : any[] = [];
  comicCharacters : any[] = [];

  characterId: number = 0;
  characterName: string = '';

  ngOnInit() {
    this.fetcCharacters();
    this.fetchComics();
  }

  onSubmitForm(form: NgForm) {
    if (form.valid) {
      this.fetchSpecificCharacter();
      form.reset();
    }
  }

  fetcCharacters() : void {
    this.marvelService.getCharacters(5).subscribe((response) => {
      this.characters = response.data.results.map((character: any) => {
        const comics = character.comics?.items?.slice(0, 5) || [];
        return {
          ...character,
          comics
        }
      })
    })
  }

  fetchComics(): void {
    this.marvelService.getComics(50).subscribe((response) => {
      // console.log(response);
      this.comicBooks = response.data.results
        .filter((comicBook: any) => comicBook.pageCount > 0 && comicBook.thumbnail && comicBook.thumbnail.path !== 'http://i.annihil.us/u/prod/marvel/i/mg/b/40/image_not_available')
        .map((comicBook: any) => {
          const comicCharacters = comicBook.characters?.items || [];
          return {
            ...comicBook,
            comicCharacters
          }
        }
      )
    })
  }

  fetchSpecificCharacter(): void {
    this.marvelService.getSpecificCharacter(this.characterName).subscribe((response) => {
      this.character = response.data.results[0];
      console.log(this.character);
    })
  }
}
