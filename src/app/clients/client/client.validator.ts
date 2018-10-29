import { Injectable } from '@angular/core';
import { FormControl } from '@angular/forms';

@Injectable()
export class ClientValidator {
    constructor() {}

    static validarCPF(control: FormControl): any {
        if (control.value === '') {
            return;
        }
        let cpf = control.value;
        cpf = cpf.replace(/[^\d]+/g, '');

        // Elimina CPFs invalidos conhecidos
        if (
            cpf.length !== 11 ||
            cpf === '00000000000' ||
            cpf === '11111111111' ||
            cpf === '22222222222' ||
            cpf === '33333333333' ||
            cpf === '44444444444' ||
            cpf === '55555555555' ||
            cpf === '66666666666' ||
            cpf === '77777777777' ||
            cpf === '88888888888' ||
            cpf === '99999999999'
        ) {
            return { invalido: true };
        }
        // Valida 1o digito
        let add = 0;
        for (let i = 0; i < 9; i++) {
            // tslint:disable-next-line:radix
            add += parseInt(cpf.charAt(i)) * (10 - i);
        }
        let rev = 11 - (add % 11);
        if (rev === 10 || rev === 11) {
            rev = 0;
        }
        // tslint:disable-next-line:radix
        if (rev !== parseInt(cpf.charAt(9))) {
            return { invalido: true };
        }
        // Valida 2o digito
        add = 0;
        for (let i = 0; i < 10; i++) {
            // tslint:disable-next-line:radix
            add += parseInt(cpf.charAt(i)) * (11 - i);
        }
        rev = 11 - (add % 11);
        if (rev === 10 || rev === 11) {
            rev = 0;
        }
        // tslint:disable-next-line:radix
        if (rev !== parseInt(cpf.charAt(10))) {
            return { invalido: true };
        }
        return null;
    }

    static validarCNPJ(control: FormControl): any {
        if (control.value === '') {
            return;
        }
        let cnpj = control.value;
        if (cnpj == null) {
            return;
        }
        cnpj = cnpj.replace(/[^\d]+/g, '');

        // Elimina CNPJs invalidos conhecidos
        if (
            cnpj === '00000000000000' ||
            cnpj === '11111111111111' ||
            cnpj === '22222222222222' ||
            cnpj === '33333333333333' ||
            cnpj === '44444444444444' ||
            cnpj === '55555555555555' ||
            cnpj === '66666666666666' ||
            cnpj === '77777777777777' ||
            cnpj === '88888888888888' ||
            cnpj === '99999999999999'
        ) {
            return { invalido: true };
        }
        // Valida 1o digito
        const numeros = [6,5,4,3,2,9,8,7,6,5,4,3,2];
        let add = 0;
        for (let i = 0; i < 12; i++) {
            // tslint:disable-next-line:radix
            add += parseInt(cnpj.charAt(i)) * numeros[i+1];
        }
        let rev = 11 - (add % 11);
        if (rev === 10 || rev === 11) {
            rev = 0;
        }
        // tslint:disable-next-line:radix
        if (rev !== parseInt(cnpj.charAt(12))) {
            return { invalido: true };
        }
        // Valida 2o digito
        add = 0;
        for (let i = 0; i < 13; i++) {
            // tslint:disable-next-line:radix
            add += parseInt(cnpj.charAt(i)) * numeros[i];
        }
        rev = 11 - (add % 11);
        if (rev === 10 || rev === 11) {
            rev = 0;
        }
        // tslint:disable-next-line:radix
        if (rev !== parseInt(cnpj.charAt(13))) {
            return { invalido: true };
        }
        return null;
    }

}
