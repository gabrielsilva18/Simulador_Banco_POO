export class Conta {
    numero: string;
    nome: string
    saldo: number;

    constructor(numero: string, nome: string, saldo: number) {
        if (saldo < 0) {
            throw new Error('Saldo inicial não pode ser negativo.');
        }

        this.numero = numero;
        this.nome = nome;
        this.saldo = saldo;
    }

    depositar(valor: number): void {
        if (valor < 0) {
            throw new Error('O valor a ser depositado não pode ser negativo.');
        }

        this.saldo = this.saldo + valor;
    }

    sacar(valor: number): boolean {
        if (valor < 0) {
            throw new Error('O valor a ser sacado não pode ser negativo.');
        }

        if (this.saldo < valor) {
            throw new Error('Saldo insuficiente.');
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

let conta1: Conta = new Conta("1", "ely", 100);
let conta2: Conta = new Conta("2", "joao", 200);

try {
    // Teste de saldo insuficiente
    conta1.sacar(200); // Isso lança um erro, pois o saldo de conta1 é 100 e não é suficiente para sacar 200.
} catch (error) {
    console.log(error.message);
}

try {
    // Teste de valores negativos
    conta1.sacar(-50); // Isso lança um erro, pois o valor a ser sacado não pode ser negativo.
} catch (error) {
    console.log(error.message);
}

try {
    // Teste de transferência com valor negativo
    conta1.transferir(conta2, -50); // Isso lança um erro, pois o valor a ser transferido não pode ser negativo.
} catch (error) {
    console.log(error.message);
}

console.log(conta1.consultarSaldo()); // 100 (o saldo não foi alterado devido ao saque malsucedido)
console.log(conta2.consultarSaldo()); // 200 (nenhuma transferência ocorreu)
