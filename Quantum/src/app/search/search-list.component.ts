import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DataService }  from '../services/data.service';
import { Link } from '../services/link';
@Component({
  	templateUrl: './search-list.component.html'
})
export class SearchListComponent implements OnInit {
	urls: Link[];
	selectedLink: Link;

	constructor(
		private dataService: DataService,
		private router: Router
	) {}

	ngOnInit(): void{
		this.urls=[];
      this.getLinks();
    }

	texto = ""
	obj = []

	search(){
		this.urls=[];
		this.dataService.fetchData(this.texto).map(
			(data) => this.obj = data
		).subscribe(() => {
			this.saveLinks();
		});
	}

	saveLinks(){
		for(let i of (this.obj as any).items){
			this.add(i.link);
		}
	}

	getLinks(): void{
		this.dataService.getLinks().then(links => this.urls = links);
	}

	onSelect(link: Link): void {
		this.selectedLink = link
	}

	gotoDetail(){
		this.router.navigate(['/detail', this.selectedLink.id]);
	}

	add(name: string): void {
	  name = name.trim();
	  if (!name) { return; }
	  this.dataService.create(name)
	    .then(link => {
	      this.urls.push(link);
	      this.selectedLink = null;
	    });
	}

}
