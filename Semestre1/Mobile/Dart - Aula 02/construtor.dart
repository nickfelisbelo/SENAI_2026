class Animal{
    //Atributos
    int id = 0;
    String nome = "";
    String especie = "";
    String raca = "";
    double peso = 0.0;
    //Métodos
    Animal(this.id, this.nome, this.especie, this.raca, this.peso);
    String tudoJunto(){
        return "$id, $nome, $especie, $raca, $peso\n";
    }
}

void main(){
    //Instancia e Objeto
    Animal boi = new Animal(1, "Bandido", "Bovino", "Nelore", 1100);
    Animal pato = new Animal(2, "Patolino", "Ave", "Pato", 12);
    Animal vaca = new Animal(3, "Mimosa", "Bovino", "Waggiu", 400);
    Animal gato = new Animal(4, "Tico", "Felino", "Angorá", 1.5);
    Animal gata = new Animal(5, "Preto", "Canino", "Huski", 12.7);
    Animal macaco = new Animal(6, "Punch", "Primata", "Macaco-japonês", 0.548);

    //Exibe o método do objeto boi
    print(boi.tudoJunto() + pato.tudoJunto() + vaca.tudoJunto() + gato.tudoJunto() + gata.tudoJunto() + macaco.tudoJunto());
}