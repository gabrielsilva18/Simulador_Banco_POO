import { Conta } from "./conta";
import { Poupanca } from "./conta";

class AplicacaoError extends Error {
    constructor(mensagem: string) {
      super(mensagem);
      this.name = this.constructor.name;
    }
  }
  
  class ContaInexistenteError extends AplicacaoError {
    constructor(numero: string) {
      super(`Conta com número ${numero} não encontrada.`);
    }
  }
  
  class SaldoInsuficienteError extends AplicacaoError {
    constructor() {
      super("Saldo insuficiente.");
    }
  }
  
  class ValorInvalidoError extends AplicacaoError {
    constructor() {
      super("Valor inválido para operação.");
    }
  }
  
  class PoupancaInvalidaError extends AplicacaoError {
    constructor() {
      super("Operação permitida apenas para contas poupança.");
    }
  }
export class Banco {
    contas: Conta[] = [];
    inserir(conta: Conta): void {
        try {
          // Tenta consultar a conta pelo número
          this.consultar(conta.Numero);
          // Se a consulta não lançar exceção, significa que a conta já existe
          console.error(`Conta com número ${conta.Numero} já existe.`);
        } catch (error) {
          // Se a exceção for ContaInexistenteError, significa que a conta não existe, então podemos adicioná-la
          if (error instanceof ContaInexistenteError) {
            console.log(`Inserindo conta com número ${conta.Numero}.`);
            this.contas.push(conta);
          } else {
            // Se a exceção for de outro tipo, trata o erro
            console.error(`Erro desconhecido: ${error.message}`);
          }
        }
      }
  
    consultar(numero: string): Conta {
      const contaEncontrada = this.contas.find(
        (conta) => conta.Numero === numero
      );
  
      if (contaEncontrada) {
        return contaEncontrada;
      } else {
        throw new ContaInexistenteError(numero);
      }
    }
  
    consultarPorIndice(numero: string): number {
      const indiceProcurado = this.contas.findIndex(
        (conta) => conta.Numero === numero
      );
  
      if (indiceProcurado !== -1) {
        return indiceProcurado;
      } else {
        throw new ContaInexistenteError(numero);
      }
    }
  
    alterar(conta: Conta): void {
      let indiceProcurado = this.consultarPorIndice(conta.Numero);
      this.contas[indiceProcurado] = conta;
    }
  
    excluir(numero: string): void {
      let indiceProcurado = this.consultarPorIndice(numero);
      this.contas.splice(indiceProcurado, 1);
    }
  
    depositar(numero: string, valor: number): void {
      let conta: Conta = this.consultar(numero)
      conta.depositar(valor)
  }
  
    sacar(numero: string, valor: number): void {
      const conta = this.consultar(numero);
      conta.sacar(valor);
    }
  
    transferir(numeroOrigem: string, numeroDestino: string, valor: number): void {
      const contaOrigem = this.consultar(numeroOrigem);
      const contaDestino = this.consultar(numeroDestino);
  
      contaOrigem.transferir(contaDestino, valor);
    }
    totalContas(): number {
      let total: number = 0
      for (let conta of this.contas) {
          total++
      }
      return total
  }
    totalSaldo(): number {
      let total: number = 0
      for (let conta of this.contas) {
          total += conta.Saldo
      }
      return total
  }
  
    mediaSaldo(): number {
      let totalContas = this.totalContas()
      let totalSaldo = this.totalSaldo()
  
      return totalSaldo / totalContas
  }
  
  renderJuros(numero: string): void {
    try {
      let conta: Conta = this.consultar(numero);

      // Verifica se a conta é uma instância de ContaPoupanca
      if (conta instanceof Poupanca) {
        conta.renderJuros();
      } else {
        throw new PoupancaInvalidaError();
      }
    } catch (error) {
      if (error instanceof AplicacaoError) {
        console.error(`Erro na aplicação: ${error.message}`);
      } else {
        console.error(`Erro desconhecido: ${error.message}`);
      }
    }
  }
  }