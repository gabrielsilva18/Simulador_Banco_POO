import prompt from "prompt-sync"
let input = prompt()
//QUESTÃO 07
class AplicacaoError extends Error {
  constructor(mensagem: string) {
    super(mensagem)
    this.name = this.constructor.name
  }
}

class ContaInexistenteError extends AplicacaoError {
  constructor(numero: string) {
    super(`Conta com número ${numero} não encontrada.`)
  }
}

class SaldoInsuficienteError extends AplicacaoError {
  constructor() {
    super("Saldo insuficiente.")
  }
}
//FIM DA QUESTAO 07

//QUESTAO 10
class ValorInvalidoError extends AplicacaoError {
  constructor() {
    super("Valor inválido para operação.")
  }
}

//QUESTAO 12
class PoupancaInvalidaError extends AplicacaoError {
  constructor() {
    super("Operação permitida apenas para contas poupança.")
  }
}

export class Conta {
  private numero: string
  private saldo: number

  constructor(numero: string, saldo: number) {
    this.numero = numero
    this.saldo = 0 // Inicializa o saldo com zero

     // REferente a questão 15
    if (!numero || typeof saldo !== "number") {
        throw new ValorInvalidoError()
      }
  
    // Utiliza o método depositar para atribuir o saldo inicial
    try {
      this.depositar(saldo)
    } catch (error : any) {
      if (error instanceof AplicacaoError) {
        console.error(`Erro na aplicação: ${error.message}`)
      } else {
        console.error(`Erro desconhecido: ${error.message}`)
      }
    }
  }

  get Numero(): string {
    return this.numero
  }

  get Saldo(): number {
    return this.saldo
  }
  //QUESTAO 11
  private validarValor(valor: number): void {
    if (valor <= 0) {
      throw new ValorInvalidoError()
    }
  }
  //QUESTAO 10
  depositar(valor: number): void {
    this.validarValor(valor)
    this.saldo = this.saldo + valor
  }
  //QUESTAO 10
  sacar(valor: number): void {
    this.validarValor(valor)

    if (this.saldo < valor) {
      throw new SaldoInsuficienteError()
    }

    this.saldo = this.saldo - valor
  }

  consultarSaldo(): number {
    return this.saldo
  }

  transferir(contaDestino: Conta, valor: number): boolean {
    try {
      this.sacar(valor)
      contaDestino.depositar(valor)
      return true
    } catch (error: any) {
      if (error instanceof AplicacaoError) {
        console.error(`Erro na aplicação: ${error.message}`)
      } else {
        console.error(`Erro desconhecido: ${error.message}`)
      }
      return false
    }
  }
}
export class Poupanca extends Conta {
  private taxaJuros: number

  constructor(numero: string, saldo: number, taxaJuros: number) {
    super(numero, saldo)
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

export class Banco {
  contas: Conta[] = []


  inserir(conta: Conta): void {
    try {
      //QUESTAO 13
      // Tenta consultar a conta pelo número
      this.consultar(conta.Numero)
      // Se a consulta não lançar exceção, significa que a conta já existe
      console.error(`Conta com número ${conta.Numero} já existe.`)
    } catch (error: any) {
      // Se a exceção for ContaInexistenteError, significa que a conta não existe, então podemos adicioná-la
      if (error instanceof ContaInexistenteError) {
        console.log(`Inserindo conta com número ${conta.Numero}.`)
        this.contas.push(conta)
      } else {
        // Se a exceção for de outro tipo, trata o erro
        console.error(`Erro desconhecido: ${error.message}`)
      }
    }
  }

  //QUESTAO 08
  consultar(numero: string): Conta {
    const contaEncontrada = this.contas.find(
      (conta) => conta.Numero === numero
    )

    if (contaEncontrada) {
      return contaEncontrada
    } else {
      throw new ContaInexistenteError(numero)
    }
  }

  //QUESTAO 08
  consultarPorIndice(numero: string): number {
    const indiceProcurado = this.contas.findIndex(
      (conta) => conta.Numero === numero
    )

    if (indiceProcurado !== -1) {
      return indiceProcurado
    } else {
      throw new ContaInexistenteError(numero)
    }
  }

  alterar(conta: Conta): void {
    let indiceProcurado = this.consultarPorIndice(conta.Numero)
    this.contas[indiceProcurado] = conta
  }

  excluir(numero: string): void {
    let indiceProcurado = this.consultarPorIndice(numero)
    this.contas.splice(indiceProcurado, 1)
  }

  depositar(numero: string, valor: number): void {
    let conta: Conta = this.consultar(numero)
    conta.depositar(valor)
  }

  sacar(numero: string, valor: number): void {
    const conta = this.consultar(numero)
    conta.sacar(valor)
  }

  transferir(numeroOrigem: string, numeroDestino: string, valor: number): void {
    const contaOrigem = this.consultar(numeroOrigem)
    const contaDestino = this.consultar(numeroDestino)

    contaOrigem.transferir(contaDestino, valor)
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

  //QUESTAO 12
  renderJuros(numero: string): void {
    try {
      let conta: Conta = this.consultar(numero)

      // Verifica se a conta é uma instância de ContaPoupanca
      if (conta instanceof Poupanca) {
        conta.renderJuros()
      } else {
        throw new PoupancaInvalidaError()
      }
    } catch (error : any) {
      if (error instanceof AplicacaoError) {
        console.error(`Erro na aplicação: ${error.message}`)
      } else {
        console.error(`Erro desconhecido: ${error.message}`)
      }
    }
  }
}
let banco: Banco = new Banco()
let opcao: string = ""

do {
  // exibir menu com opções
  console.log("\nBem-vindo, digite uma opcao: \n")
  console.log(
    "1 - Cadastrar      2 - Consultar       3 - Sacar\n" +
      "4 - Depositar      5 - Excluir         6 - Transferir\n" +
      "7 - Render Juros   0 - Sair\n"
  )
  //QUESTAO 141
  
 try {
    // ler uma opção pelo teclado
    opcao = input("Opcao: ")

    switch (opcao) {
      case "1":
        // opção cadastrar...
        cadastrarConta()
        break
      case "2":
        // opção consultar...
        consultarConta()
        break
      case "3":
        // opção sacar...
        sacarValor()
        break
      case "4":
        // opção depositar...
        depositarValor()
        break
      case "5":
        // opção excluir...
        excluirConta()
        break
      case "6":
        // opção transferir...
        transferirValor()
        break
      case "7":
        // opção renderJuros...
        renderizarJuros()
        break
      case "0":
        console.log("Saindo...")
        break
      default:
        console.log("Opcao invalida")
    }
  } catch (e: any) {
    if (e instanceof AplicacaoError) {
      console.log(e.message)
    } else if (e instanceof Error) {
      console.log("Erro no sistema. Contate o administrador.")
    }
  } finally {
    console.log("Operação finalizada. Digite 9 para sair")
  }
} while (opcao !== "9")

console.log("Aplicação encerrada")

function cadastrarConta(): void {
  console.log("\nCadastrar conta\n");
  try {
    let numero: string = input("Digite o numero da conta: ");
    let saldo: number = +input("Digite o saldo inicial: ");
    let tipoConta: string = input("Digite o tipo de conta (C para Conta, P para Poupança, I para Conta Imposto): ").toUpperCase();

    // Referente a questão 15
    if (!numero || isNaN(saldo) || saldo < 0) {
      throw new ValorInvalidoError();
    }

    let conta: Conta;

    switch (tipoConta) {
      case 'C':
        conta = new Conta(numero, saldo);
        break;
      case 'P':
        let taxaJuros: number = +input("Digite a taxa de juros da Poupança: ");
        conta = new Poupanca(numero, saldo, taxaJuros);
        break;
      case 'I':
        let taxaDesconto: number = +input("Digite a taxa de desconto da Conta Imposto: ");
        conta = new ContaImposto(numero, saldo, taxaDesconto);
        break;
      default:
        throw new ValorInvalidoError();
    }

    banco.inserir(conta);
  } catch (error: any) {
    if (error instanceof ValorInvalidoError) {
      console.log(`Erro na aplicação: ${error.message}`);
    } else {
      console.log(`Erro desconhecido: ${error.message}`);
    }
  }
}


function consultarConta(): void {
  console.log("\nConsultar conta\n");
  try {
    let numero: string = input("Digite o numero da conta: ");

    // Referente a questão 15
    if (!numero) {
      throw new ValorInvalidoError();
    }

    const conta = banco.consultar(numero);
    console.log(`Número: ${conta.Numero}, Saldo: ${conta.Saldo}`);
  } catch (error: any) {
    if (error instanceof ValorInvalidoError) {
      console.log(`Erro na aplicação: ${error.message}`);
    } else {
      console.log(`Erro desconhecido: ${error.message}`);
    }
  }
}

function sacarValor(): void {
  console.log("\nSacar valor\n")
  try {
    let numero: string = input("Digite o numero da conta: ")
    let valor: number = +input("Digite o valor de saque: ")

    // Referente a questão 15
    if (!numero || isNaN(valor) || valor <= 0) {
      throw new ValorInvalidoError()
    }

    banco.sacar(numero, valor)
  } catch (error: any) {
    if (error instanceof ValorInvalidoError) {
      console.log(`Erro na aplicação: ${error.message}`)
    } else {
      console.log(`Erro desconhecido: ${error.message}`)
    }
  }
}

function depositarValor(): void {
  console.log("\nDepositar valor\n")
  try {
    let numero: string = input("Digite o numero da conta: ")
    let valor: number = +input("Digite o valor de deposito: ")

    // Referente a questão 15
    if (!numero || isNaN(valor) || valor <= 0) {
      throw new ValorInvalidoError()
    }

    banco.depositar(numero, valor)
  } catch (error: any) {
    if (error instanceof ValorInvalidoError) {
      console.log(`Erro na aplicação: ${error.message}`)
    } else {
      console.log(`Erro desconhecido: ${error.message}`)
    }
  }
}

function excluirConta(): void {
  console.log("\nExcluir conta\n")
  try {
    let numero: string = input("Digite o numero da conta: ")

    // Referente a questão 15
    if (!numero) {
      throw new ValorInvalidoError()
    }

    banco.excluir(numero)
  } catch (error: any) {
    if (error instanceof ValorInvalidoError) {
      console.log(`Erro na aplicação: ${error.message}`)
    } else {
      console.log(`Erro desconhecido: ${error.message}`)
    }
  }
}

function transferirValor(): void {
  console.log("\nTransferir valor\n")
  try {
    let numeroDebito: string = input("Digite o numero da conta de origem: ")
    let numeroCredito: string = input("Digite o numero da conta de destino: ")
    let valor: number = +input("Digite o valor a ser transferido: ")

    // Referente a questão 15
    if (!numeroDebito || !numeroCredito || isNaN(valor) || valor <= 0) {
      throw new ValorInvalidoError()
    }

    banco.transferir(numeroCredito, numeroDebito, valor)
  } catch (error: any) {
    if (error instanceof ValorInvalidoError) {
      console.log(`Erro na aplicação: ${error.message}`)
    } else {
      console.log(`Erro desconhecido: ${error.message}`)
    }
  }
}

function renderizarJuros(): void {
  console.log("\nRender Juros\n")
  try {
    let numero: string = input("Digite o numero da conta: ")

    // Referente a questão 15
    if (!numero) {
      throw new ValorInvalidoError()
    }

    banco.renderJuros(numero)
  } catch (error: any) {
    if (error instanceof ValorInvalidoError) {
      console.log(`Erro na aplicação: ${error.message}`)
    } else {
      console.log(`Erro desconhecido: ${error.message}`)
    }
  }
}
