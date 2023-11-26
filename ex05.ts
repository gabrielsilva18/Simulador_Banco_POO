import { Conta } from "./ex3_4";

export class Banco {
  contas: Conta[] = [];

  inserir(conta: Conta): void {
    this.contas.push(conta);
  }

  consultar(numero: string): Conta | null {
    const contaEncontrada = this.contas.find((conta) => conta.numero === numero);

    return contaEncontrada || null;
  }

  consultarPorIndice(numero: string): number {
    return this.contas.findIndex((conta) => conta.numero === numero);
  }

  alterar(conta: Conta): void {
    let indiceProcurado = this.consultarPorIndice(conta.numero);

    if (indiceProcurado !== -1) {
      this.contas[indiceProcurado] = conta;
    }
  }

  excluir(numero: string): void {
    let indiceProcurado = this.consultarPorIndice(numero);

    if (indiceProcurado !== -1) {
      this.contas.splice(indiceProcurado, 1);
    }
  }

  sacar(numero: string, valor: number): void {
    const conta = this.consultar(numero);

    if (conta !== null) {
      conta.sacar(valor);
    }
  }
}

let banco = new Banco();
let conta1 = new Conta("1", "Ely", 100);
let conta2 = new Conta("2", "Joao", 200);

banco.inserir(conta1);
banco.inserir(conta2);

// Chamar o método transferir com um valor que lance uma exceção
conta1.sacar(200); // Isso lança um erro, pois o saldo de c1 é 100 e não é suficiente para sacar 200.

conta1.transferir(conta2, 50); // Como o saque anterior falhou, essa transferência não ocorre.

console.log(conta1.consultarSaldo()); // 100 (o saldo não foi alterado devido ao saque malsucedido)
console.log(conta2.consultarSaldo()); // 200 (nenhuma transferência ocorreu)

/*Acredito que a confiabilidade da implementação depende do contexto e dos requisitos específicos do sistema. Existem exemplos em que essa possa ser a melhor abordagem como 
também existem exemplos em que outra abordagem possa ser melhor*/
