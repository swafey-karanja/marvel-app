import { Component } from '@angular/core';
// import { RouterOutlet } from '@angular/router';
import { MarvelService } from './services/marvel.service';
import { NgFor } from '@angular/common';

@Component({
  selector: 'app-root',
  imports: [NgFor],
  providers: [MarvelService],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'marvel-app';

  constructor(private marvelService: MarvelService) {}

  characters: any[] = [];
  comics: any[] = [];
  comicBooks : any[] = [];
  comicCharacters : any[] = [];

  ngOnInit() {
    this.fetcCharacters();
    this.fetchComics();
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
      console.log(response);
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
}
