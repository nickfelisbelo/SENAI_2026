import 'package:flutter/material.dart';

void main() {
  runApp(const MainApp());
}

class MainApp extends StatefulWidget {
  const MainApp({super.key});

  @override
  State<MainApp> createState() => _MainAppState();
}

class _MainAppState extends State<MainApp> {
  String nome = '';
  double peso = 0.0;
  double altura = 0.0;
  double? imc;
  String? resultado = "Resultado";

  void processar() {
    setState(() {
      imc = peso / (altura * altura);

      if (imc! < 20) {
        resultado =
            "$nome seu IMC é ${imc!.toStringAsFixed(2)}, você está abaixo do peso";
      } else {
        resultado =
            "$nome seu IMC é ${imc!.toStringAsFixed(2)}, você está obeso";
      }
    });

    showDialog(
      context: context,
      builder: (context) {
        return AlertDialog(
          title: const Text("IMC"),
          content: Text("$resultado"),
          actions: [
            TextButton(
              child: const Text("OK"),
              onPressed: () {
                Navigator.of(context).pop();
              },
            ),
          ],
        );
      },
    );
  }

  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      home: Scaffold(
        body: Center(
          child: Column(
            mainAxisAlignment: MainAxisAlignment.center,
            spacing: 12.0,
            children: [
              const Text(
                'IMC',
                style: TextStyle(
                  color: Color.fromARGB(255, 100, 0, 0),
                  fontWeight: FontWeight.bold,
                  fontSize: 22.0,
                ),
              ),
              TextField(
                decoration: const InputDecoration(labelText: "Nome"),
                onChanged: (value) {
                  nome = value;
                },
              ),
              TextField(
                decoration: const InputDecoration(labelText: "Peso"),
                onChanged: (value) {
                  peso = double.parse(value);
                },
              ),
              TextField(
                decoration: const InputDecoration(labelText: "Altura"),
                onChanged: (value) {
                  altura = double.parse(value);
                },
              ),
              ElevatedButton(
                onPressed: () {
                  processar();
                },
                child: const Text("Calcular"),
              ),
            ],
          ),
        ),
      ),
    );
  }
}
