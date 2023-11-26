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
  
  export class Conta {
    private numero: string;
    private saldo: number;
  
    constructor(numero: string, saldo: number) {
      this.numero = numero;
      this.saldo = 0; // Inicializa o saldo com zero
  
      // Utiliza o método depositar para atribuir o saldo inicial
      try {
        this.depositar(saldo);
      } catch (error) {
        if (error instanceof AplicacaoError) {
          console.error(`Erro na aplicação: ${error.message}`);
        } else {
          console.error(`Erro desconhecido: ${error.message}`);
        }
      }
    }
  
    get Numero(): string {
        return this.numero
    }
  
    get Saldo(): number {
        return this.saldo
    }
    private validarValor(valor: number): void {
      if (valor <= 0) {
        throw new ValorInvalidoError();
      }
    }
  
    depositar(valor: number): void {
      this.validarValor(valor);
      this.saldo = this.saldo + valor;
    }
  
    sacar(valor: number): void {
      this.validarValor(valor);
  
      if (this.saldo < valor) {
        throw new SaldoInsuficienteError();
      }
  
      this.saldo = this.saldo - valor;
    }
  
    consultarSaldo(): number {
      return this.saldo;
    }
  
    transferir(contaDestino: Conta, valor: number): boolean {
      try {
        this.sacar(valor);
        contaDestino.depositar(valor);
        return true;
      } catch (error) {
        if (error instanceof AplicacaoError) {
          console.error(`Erro na aplicação: ${error.message}`);
        } else {
          console.error(`Erro desconhecido: ${error.message}`);
        }
        return false;
      }
    }
  }
  export class Poupanca extends Conta {
    private taxaJuros: number
  
    constructor(numero: string, saldo: number, taxaJuros: number) {
        super(numero,saldo)
        this.taxaJuros = taxaJuros
    }
  
    public renderJuros(): void {
        this.depositar(this.Saldo * (this.taxaJuros / 100))
    }
  
    get TaxaJuros(): number {
        return this.taxaJuros
    }
  }
  
  export class ContaImposto extends Conta {
    private _taxaDesconto: number
  
    constructor(numero: string, saldo: number, taxaDesconto: number) {
        super(numero, saldo)
        this._taxaDesconto = taxaDesconto
    }
  
    public debitar(valor: number): void {
        let total = valor + valor * (this._taxaDesconto / 100)
        super.sacar(total)
    }
  }
  