import 'package:flutter/material.dart';
import 'package:telas_2026/screens/produtos.dart';

class Home extends StatelessWidget {
  const Home({super.key});

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      backgroundColor: Colors.pinkAccent,
      appBar: AppBar(
        backgroundColor: Color.fromARGB(255, 255, 120, 127),
        title: Text(
          "Home",
          style: TextStyle(fontWeight: FontWeight.bold, color: Colors.white),
        ),
      ),
      body: Container(
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
          spacing: 30.0,
          children: [
            Center(
              child: ElevatedButton(
                onPressed: () => Navigator.push(
                  context,
                  MaterialPageRoute(builder: (context) => Produtos()),
                ),
                style: ElevatedButton.styleFrom(
                  backgroundColor: Color.fromARGB(255, 255, 120, 127),
                ),
                child: Text(
                  "Entrar",
                  style: TextStyle(color: Colors.white, fontSize: 22.0),
                ),
              ),
            ),
          ],
        ),
      ),
    );
  }
}
