class Animal{
    //Atributos
    int id = 0;
    String nome = "";
    String especie = "";
    String raca = "";
    double peso = 0.0;
    //Métodos
    String tudoJunto(){
        return " $id,\n $nome,\n $especie,\n $raca,\n $peso";
    }
}

void main(){
    //Instancia
    Animal boi;

    //Objeto
    boi = new Animal();

    //Configurando os atributos
    boi.id = 1;
    boi.nome = "Bandido";
    boi.especie = "Bovino";
    boi.raca = "Simetral com Nelore";
    boi.peso = 1100;

    //Exibe o método do objeto boi
    print(boi.tudoJunto());
}