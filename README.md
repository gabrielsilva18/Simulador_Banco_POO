# Sistema Bancário em TypeScript

Este projeto é um exemplo de implementação de um sistema bancário em TypeScript, incluindo contas, transferências, depósitos, saques e tratamentos de erro. Ele também contém exemplos didáticos de diferentes estratégias de tratamento de erros.

---

## Estrutura do Projeto

/src
/models
ContaBasica.ts # Conta simples, operações básicas sem validações avançadas
ContaValidacoes.ts # Conta com validações de valores e saldo insuficiente
Poupanca.ts # Conta poupança com juros
ContaImposto.ts # Conta com taxa de desconto
/services
Banco.ts # Lógica de gerenciamento de contas (inserir, consultar, alterar, excluir, transferir)
BancoSimples.ts # Versão simplificada de Banco para testes
/examples
TratamentoErros.ts # Exemplos de tratamento de erros: ignorar, exibir mensagem, retornar código de erro
/app
App.ts # Ponto de entrada do projeto, menu de interação com usuário

yaml
Copiar código

---

## Funcionalidades

- Criar contas do tipo `Conta`, `Poupanca` ou `ContaImposto`
- Consultar saldo e informações da conta
- Depositar e sacar valores
- Transferir valores entre contas
- Renderizar juros para contas poupança
- Debitar valores com taxa em contas de imposto
- Tratamento de erros para operações inválidas ou saldo insuficiente
- Exemplos didáticos de diferentes estratégias de tratamento de erro (`TratamentoErros.ts`)

---

## Como usar

1. Clone este repositório:

```bash
git clone <URL_DO_REPOSITORIO>
Instale dependências (se necessário):

bash
Copiar código
npm install
Compile o TypeScript:

bash
Copiar código
tsc
Execute a aplicação:

bash
Copiar código
node dist/app/App.js
Observação: Ajuste o caminho caso o compilado vá para outra pasta.

Estrutura de classes
Conta
Classe base com métodos: depositar, sacar, transferir, consultarSaldo.

Poupanca
Herda de Conta e adiciona renderJuros.

ContaImposto
Herda de Conta e adiciona debitar com taxa de desconto.

Banco
Gerencia múltiplas contas, permite inserção, exclusão, alteração, transferências e cálculos de saldo total e média.

TratamentoErros
Exemplos didáticos de como tratar exceções de formas diferentes:

Ignorar a operação

Exibir mensagem de erro

Retornar código de erro

Observações
O projeto mantém arquivos de exemplos e versões simplificadas para fins didáticos.

Para uso real, utilize as classes com validações (ContaValidacoes.ts, Banco.ts).

Autor
Gabriel Silva
