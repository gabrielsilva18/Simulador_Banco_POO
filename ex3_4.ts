export class Conta {
    numero: string;
    nome: string
    saldo: number;

    constructor(numero: string, nome: string, saldo: number) {
        this.numero = numero;
        this.nome = nome;
        this.saldo = saldo;
    }

    depositar(valor: number): void {
        this.saldo = this.saldo + valor;
    }

    sacar(valor: number): boolean {
        if (this.saldo < valor) {
            throw new Error('Saldo insuficiente.')
        }

        this.saldo = this.saldo - valor;
        return true;
    }

    consultarSaldo(): number {
        return this.saldo;
    }

    transferir(contaDestino: Conta, valor: number): boolean {
        if (!this.sacar(valor)) {
            return false;
        }

        contaDestino.depositar(valor);
        return true;
    }
}

let c1: Conta = new Conta("1", "ely", 100);
let c2: Conta = new Conta("2", "joao", 200);

//ex03:
/*c1.sacar(200); //throw new Error('Saldo insuficiente.');
//Error: Saldo insuficiente.*/


//ex04:
c1.sacar(200); // Isso lança um erro, pois o saldo de c1 é 100 e não é suficiente para sacar 200.

c1.transferir(c2, 50); // Como o saque anterior falhou, essa transferência não ocorre.

console.log(c1.consultarSaldo()); // 100 (o saldo não foi alterado devido ao saque malsucedido)
console.log(c2.consultarSaldo()); // 200 (nenhuma transferência ocorreu)
