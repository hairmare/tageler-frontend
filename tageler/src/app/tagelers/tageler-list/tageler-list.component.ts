import { Component, OnInit } from '@angular/core';
import { Tageler } from '../tageler';
import { TagelerService } from '../tageler.service';
import { TagelerDetailsComponent } from '../tageler-details/tageler-details.component';
// import 'rxjs/Rx'; //this sadlydoes not help...
//https://devcenter.heroku.com/articles/mean-apps-restful-api
@Component({
  selector: 'tageler-list',
  templateUrl: './tageler-list.component.html',
  styleUrls: ['./tageler-list.component.css'],
  providers: [TagelerService]
})

export class TagelerListComponent implements OnInit {
  tagelers: Tageler[];
  selectedTageler: Tageler;

  constructor(private tagelerService: TagelerService) { }

  ngOnInit() {
    console.log("Init");
    this.tagelerService
      .getTagelers()
      .then((tagelers: Tageler[]) => {
        //This is not working, but why!?
        // ref: https://devcenter.heroku.com/articles/mean-apps-restful-api
        this.tagelers =  this.tagelers =  tagelers.map((tageler) => {
            if (!tageler.titel){
              tageler.titel = 'default';
            }
            return tageler;
          }
        );
      });
  }

  private getIndexOfTageler = (tagelerId: String) => {
    return this.tagelers.findIndex((tageler) => {
      return tageler._id === tagelerId;
    });
  }

  selectTageler(tageler: Tageler) {
    this.selectedTageler = tageler
  }

  createNewTageler() {
    var tageler: Tageler = {
      titel: '',
      einheit: '',
      start: '',
      ende: '',
      mitnehmen: '',
      tenue: '',
      abmeldefrist: ''
    };

// By default, a newly-created tageler will have the selected state.
    this.selectTageler(tageler);
  }

  deleteTageler = (tagelerId: String) => {
    var idx = this.getIndexOfTageler(tagelerId);
    if (idx !== -1) {
      this.tagelers.splice(idx, 1);
      this.selectTageler(null);
    }
    return this.tagelers;
  }

  addTageler = (tageler: Tageler) => {
    this.tagelers.push(tageler);
    this.selectTageler(tageler);
    return this.tagelers;
  }

  updateTageler = (tageler: Tageler) => {
    var idx = this.getIndexOfTageler(tageler._id);
    if (idx !== -1) {
      this.tagelers[idx] = tageler;
      this.selectTageler(tageler);
    }
    return this.tagelers;
  }
}
