import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl, FormArray } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router'

import { ClientsService } from '../clients/clients.service'
import { NotificationService } from '../shared/messages/notification.service';
import { ClientValidator } from '../clients/client/client.validator';

import { Client, Phone } from '../clients/client/client.model'


@Component({
  selector: 'mt-client-detail',
  templateUrl: './client-detail.component.html'
})
export class ClientDetailComponent implements OnInit {

  client: Client
  clientForm: FormGroup
  type = 'PF'
  new = false
  telefonesLength = 0
  groupNames = ['A','B','C','D','E','F','G','H','I','J','K','L','M','N','O','P','Q','R','S','T','U','V','W','X','Y','Z']

  constructor(private clientsService: ClientsService,
              private fb: FormBuilder,
              private notificationService: NotificationService,
              private router: Router,
              private route: ActivatedRoute) { }

  ngOnInit() {
    this.clientForm = this.fb.group({
      name: this.fb.control('', [Validators.required]),
      email: this.fb.control('', [Validators.required, Validators.email]),
      type: this.fb.control('PF', [Validators.required]),
      status: this.fb.control('true', [Validators.required]),
      telefones: this.fb.array([]),
      group: this.fb.control(''),
      cpf: this.fb.control(''),
      cnpj: this.fb.control(''),
      rg: this.fb.control(''),
      ie: this.fb.control('')
    })

    //set validators dinamically
    this.clientForm.get('type').valueChanges.subscribe((type: string) => {
      console.log(this.clientForm.get('group').value)
      if (type === 'PF'){
        this.type = 'PF'
        this.clientForm.get('cpf')
          .setValidators([
            Validators.required, 
            Validators.pattern('[0-9]{3}\.?[0-9]{3}\.?[0-9]{3}\-?[0-9]{2}'),
            ClientValidator.validarCPF
          ])
      } else if (type === 'PJ'){
        this.type = 'PJ'
        this.clientForm.get('cnpj')
          .setValidators([
            Validators.required,
            Validators.pattern('[0-9]{2}\.?[0-9]{3}\.?[0-9]{3}\/?[0-9]{4}\-?[0-9]{2}'),
            ClientValidator.validarCNPJ
          ])
      }
    })

    //fill form when updating client
    let id = this.route.snapshot.params['id']
    if(id !== 'new'){
      this.clientsService.clientById(id)
      .subscribe(client => {
        this.client = client
        console.log(this.client)
        const clientPhones = []
        if(this.client.telefones){
          this.client.telefones.forEach(telefone => {
            this.insertPhone()
            clientPhones.push(telefone.ddd + telefone.number)
          })
        }
        console.log(clientPhones)
        this.clientForm.setValue({
          name: this.client.name,
          email: this.client.email,
          status: this.client.status,
          group: this.client.group || '',
          type: this.client.type || '',
          telefones: clientPhones,
          cpf: this.client.cpf || '',
          cnpj: this.client.cnpj || '',
          rg: this.client.rg || '',
          ie: this.client.ie || ''
        })
        this.clientForm.controls['type'].setValue(this.client.type, {onlySelf: true})
        this.clientForm.controls['status'].setValue(this.client.status, {onlySelf: true})
      })
    } else {
      this.new = true
      this.insertPhone()
    }

  }

  getPhones(): FormArray {
    return this.clientForm.get('telefones') as FormArray
  }
  insertPhone(){
    this.getPhones().push(new FormControl())
    this.telefonesLength++
  }

  removePhone(){
    this.getPhones().removeAt(-1)
    this.telefonesLength--
  }

  save() {
    const clientDataPhone: Phone[] = []
    this.clientForm.get('telefones').value
                    .filter(tel => tel !== null && tel !== '')
                    .forEach((tel2:string) => clientDataPhone.push({ddd: tel2.substr(0,2), number: tel2.substr(2)}))
    const clientData: Client = <Client>{
      name: this.clientForm.get('name').value,
      email: this.clientForm.get('email').value,
      type: this.clientForm.get('type').value,
      status: this.clientForm.get('status').value,
      group: this.clientForm.get('group').value,
      telefones: clientDataPhone,
      date_create: new Date().toISOString()
    }
    if (this.clientForm.get('type').value === 'PF') {
      clientData.cpf = this.clientForm.get('cpf').value
      clientData.rg = this.clientForm.get('rg').value
    } else if (this.clientForm.get('type').value === 'PJ') {
      clientData.cnpj = this.clientForm.get('cnpj').value
      clientData.ie = this.clientForm.get('ie').value
    }

    if(this.new){ //gravar novo
      this.clientsService.saveClient(clientData).subscribe(
        client => {
          this.notificationService.notify(`${client.name} was successfully created!`),
          this.router.navigate(['/clients'])
        },
        response => this.notificationService.notify(response.error.message)
      )
    } else {  //atualizar existente
      clientData.id = this.client.id
      this.clientsService.updateClient(clientData).subscribe(
        client => {
          this.notificationService.notify(`${client.name} was successfully updated!`),
          this.router.navigate(['/clients'])
        },
        response => this.notificationService.notify(response.error.message)
      )
    }
  }

  delete(){
    if(confirm(`Tem certeza que deseja remover ${this.client.name}?`)) {
      this.clientsService.deleteClient(this.client.id).subscribe(
        () => {
          this.notificationService.notify(`${this.client.name} was successfully deleted!`),
          this.router.navigate(['/clients'])
        },
        response => this.notificationService.notify(response.error.message)
      )
    }
  }

}
