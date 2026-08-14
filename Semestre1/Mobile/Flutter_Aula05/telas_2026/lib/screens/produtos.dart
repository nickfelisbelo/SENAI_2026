import 'package:flutter/material.dart';

class Produtos extends StatefulWidget {
  const Produtos({super.key});

  @override
  State<Produtos> createState() => _ProdutosState();
}

class _ProdutosState extends State<Produtos> {
  String nome = "";
  double preco = 0.0;
  int quantidade = 0;
  double subtotal = 0.0;

  void calcular() {
    subtotal = preco * quantidade;
    mostrarProduto();
  }

  void mostrarProduto() {
    showDialog(
      context: context,
      builder: (BuildContext context) => AlertDialog(
        title: Text(nome),
        content: Text(
          "Preço: ${preco.toStringAsFixed(2)}\nQuantidade: $quantidade\n ${subtotal.toStringAsFixed(2)}",
        ),
      ),
    );
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      backgroundColor: Colors.pinkAccent,
      appBar: AppBar(
        backgroundColor: Colors.pinkAccent,
        title: Text(
          "Produtos",
          style: TextStyle(color: Colors.white, fontWeight: FontWeight.bold),
        ),
      ),
      body: Container(
        padding: const EdgeInsets.all(18.0),
        decoration: BoxDecoration(
          image: DecorationImage(
            image: AssetImage("assets/background.jpg"),
            fit: BoxFit.cover, // Cobre toda a tela
            colorFilter: ColorFilter.mode(
              Color.fromRGBO(0, 0, 0, 0.8),
              BlendMode.dstATop,
            ),
          ),
        ),
        child: Column(
          mainAxisAlignment: MainAxisAlignment.center,
          spacing: 40.0,
          children: [
            Text("Produtos"),
            TextField(decoration: InputDecoration(labelText: "Nome")),
            TextField(decoration: InputDecoration(labelText: "Preco")),
            TextField(decoration: InputDecoration(labelText: "Quantidade")),
            Row(
              mainAxisAlignment: MainAxisAlignment.center,
              spacing: 20.0,
              children: [
                ElevatedButton(
                  onPressed: () => calcular(),
                  child: Text("Subtotal"),
                ),
                ElevatedButton(
                  onPressed: () => Navigator.pop(context),
                  child: Text("Sair"),
                ),
              ],
            ),
          ],
        ),
      ),
    );
  }
}
