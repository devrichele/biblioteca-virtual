// lib/gerarRecomendacoes.ts
import { GoogleGenerativeAI } from "@google/generative-ai";
const apiKey = process.env.NEXT_PUBLIC_GEMINI_API_KEY;

if (!apiKey) {
  throw new Error("API Key do Gemini não encontrada. Verifique o .env.local");
}

const genAI = new GoogleGenerativeAI(apiKey);

export async function gerarRecomendacoes(formData: any) {
  const model = genAI.getGenerativeModel({
    model: "gemini-1.5-flash",
  });

  const prompt = `
Você é um bibliotecário virtual. Baseando-se nas informações do usuário, recomende 3 livros.

Nome: ${formData.nomeCompleto}
Gêneros favoritos: ${formData.generosFavoritos.join(", ")}
Outros gêneros: ${formData.outrosGeneros}
Formato preferido: ${formData.formatoPreferido}
Idioma preferido: ${formData.idiomaPreferido}
Frequência de leitura: ${formData.frequenciaLeitura}
Autores favoritos: ${formData.autoresFavoritos}
Observações: ${formData.observacoes}

Responda no seguinte formato JSON:
{
  "output": {
    "nomeUsuario": "Nome do usuário",
    "recomendacoes": [
      {
        "titulo": "Nome do livro",
        "autor": "Nome do autor",
        "genero": "Gênero",
        "motivo": "Motivo da recomendação",
        "ondeEncontrar": "Sugestão de onde o usuário pode encontrar o livro"
      }
    ],
    "mensagemFinal": "Mensagem de encerramento personalizada"
  }
}
`;

  const result = await model.generateContent({
    contents: [
      {
        role: "user",
        parts: [{ text: prompt }],
      },
    ],
  });

  const text = await result.response.text();

  try {
    const jsonMatch = text.match(/\{[\s\S]*\}/);

    if (!jsonMatch) throw new Error("JSON não encontrado na resposta.");
    return JSON.parse(jsonMatch[0]);
  } catch (e) {
    console.error("Erro ao interpretar resposta da IA:", e);
    throw new Error("A resposta da IA não está em formato JSON válido.");
  }
}
