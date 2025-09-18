/*1-Desconsiderar Operação:
    Nesse tipo de tratamento, a aplicação ignora o erro e continua sua execução. Isso é adequado quando o erro não é crítico e não impede o fluxo geral do programa.

Exemplo:*/
 function dividir(a: number, b: number): void {
  try {
    // Tentar realizar a divisão
    const resultado: number = a / b;
    console.log(`Resultado da divisão: ${resultado}`);
  } catch (erro) {
    // Não fazer nada em caso de erro
  }
}

// Exemplos de chamadas da função
dividir(10, 2);  // Resultado da divisão: 5
dividir(8, 0);   // Nenhuma saída, pois o erro é capturado silenciosamente
dividir(15, 3);  // Resultado da divisão: 5


/*2-Exibir Mensagem de Erro:
   Quando ocorre um erro, exibe-se uma mensagem de erro para o usuário ou para o desenvolvedor. Isso é útil para depuração e para informar os usuários sobre problemas.
Exemplo:
*/
function dividir2(a: number, b: number) {
  try {
    // Tentar realizar a divisão
    const resultado = a / b;
    console.log(`Resultado da divisão: ${resultado}`);
  } catch (erro) {
    // mensagem de erro
    console.log('Erro ao dividir.');
  }
}

// Exemplos de chamadas da função
dividir2(10, 2);  // Resultado da divisão: 5
dividir2(8, 0);   // Erro ao dividir, mas continuando a execução.
dividir2(15, 3);  // Resultado da divisão: 5


/*3-Retornar um Código de Erro:
   Em vez de lançar uma exceção, uma função pode retornar um código de erro especial para indicar que algo deu errado. 
  Quem chama a função pode verificar esse código e tomar medidas apropriadas.
Exemplo:*/
function divide(x: number, y: number) {
  if (y === 0) {
    // Retornar código de erro
    return { error: true, message: 'Divisão por zero não permitida' };
  }
  // Retornar resultado da divisão
  return { error: false, result: x / y };
}

const result = divide(10, 0);

if (result.error) {
  console.error(result.message);
  // Tomar medidas apropriadas
} else {
  console.log(result.result);
}

