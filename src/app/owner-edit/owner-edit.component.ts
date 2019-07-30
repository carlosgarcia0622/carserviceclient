import { Component, OnDestroy,OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';
import { OwnerService } from '../shared/owner/owner.service';
import { GiphyService } from '../shared/giphy/giphy.service';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-owner-edit',
  templateUrl: './owner-edit.component.html',
  styleUrls: ['./owner-edit.component.css']
})
export class OwnerEditComponent implements OnInit, OnDestroy {

  owner: any = {};

  sub: Subscription;

  constructor(private route: ActivatedRoute,private router: Router, private ownerService: OwnerService, private giphyService: GiphyService) {}

  ngOnInit() {
    this.sub = this.route.params.subscribe(params => {
      const dni = params['dni'];
      if(dni){
        this.ownerService.getByDni(dni).subscribe((owner:any)=>{
          if(owner){
            this.ownerService.getById(owner[0].id).subscribe((ownerComplete:any)=>{
              this.owner = ownerComplete
              this.owner.href = ownerComplete._links.self.href;
              console.log(this.owner)
            })

          }else{
            console.log(`Owner with dni '${dni}' not found, returning to list`);
            this.gotoList();
          }
        })
      }

    });
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }

  gotoList() {
    this.router.navigate(['/owner-list']);
  }

  save(form: NgForm) {
    this.ownerService.save(form).subscribe(result => {
      this.gotoList();
    }, error => console.error(error));
  }

  remove(href) {
    this.ownerService.remove(href).subscribe(result => {
      this.gotoList();
    }, error => console.error(error));
  }

}
