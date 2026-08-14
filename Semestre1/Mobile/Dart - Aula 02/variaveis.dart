void main(){
    //Variaveis
    int numero = 2;
    String texto = "Nicollas Felisbelo da Silva";
    bool ativo = false; 
    var naoTipada = 50;
    dynamic dinamica = "Oi";
    //processamento
    numero = numero + numero;
    naoTipada = 40;
    dinamica = 20;

    //Saídas
    print("Concatenar = " + texto + ", Soma = " + numero.toString());
    print("Usando template string a soma de 2 + 2 é $numero");
    print("Abaixo temos o resultado de um if ternário:");
    print(ativo?"Oi":"Tchau");
    print("Não tipada = $naoTipada");
    print("dinamina = $dinamica");
}