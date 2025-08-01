"use client";

import type React from "react";
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { gerarRecomendacoes } from "./lib/gerarRecomendacoes";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  User,
  Heart,
  Clock,
  MessageSquare,
  LibraryBigIcon,
} from "lucide-react";

interface BookRecommendation {
  titulo: string;
  autor: string;
  genero: string;
  motivo: string;
  ondeEncontrar: string | null;
}

interface ApiResponse {
  output: {
    nomeUsuario: string;
    recomendacoes: BookRecommendation[];
    mensagemFinal: string;
  };
}

export default function BibliotecaForm() {
  const [formData, setFormData] = useState({
    nomeCompleto: "",
    email: "",
    telefone: "",
    generosFavoritos: [] as string[],
    outrosGeneros: "",
    formatoPreferido: "",
    idiomaPreferido: "",
    frequenciaLeitura: "",
    autoresFavoritos: "",
    observacoes: "",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showRecommendations, setShowRecommendations] = useState(false);
  const [recommendations, setRecommendations] = useState<ApiResponse | null>(
    null
  );
  const [submitStatus, setSubmitStatus] = useState<"success" | "error" | null>(
    null
  );

  const generos = [
    "Ficção",
    "Romance",
    "Mistério",
    "Fantasia",
    "Biografia",
    "Autobiografia",
    "História",
    "Ciência",
    "Tecnologia",
  ];

  // Fazer a mensagem de sucesso desaparecer após 3 segundos
  useEffect(() => {
    if (submitStatus === "success") {
      const timer = setTimeout(() => {
        setSubmitStatus(null);
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [submitStatus]);

  const handleGenreChange = (genre: string, checked: boolean) => {
    setFormData((prev) => ({
      ...prev,
      generosFavoritos: checked
        ? [...prev.generosFavoritos, genre]
        : prev.generosFavoritos.filter((g) => g !== genre),
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus(null);

    try {
      const data = await gerarRecomendacoes(formData);
      setRecommendations(data);
      setSubmitStatus("success");
      setShowRecommendations(true);
    } catch (error) {
      console.error("Erro ao gerar recomendações:", error);
      setSubmitStatus("error");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div
      className="min-h-screen p-4"
      style={{
        backgroundImage:
          "url('https://img.freepik.com/vetores-premium/padrao-sem-emenda-de-vetor-de-livros-de-desenho-em-fundo-marrom_574806-380.jpg')",
      }}
    >
      <div className="max-w-2xl mx-auto">
        <Card
          className="border-0 shadow-lg"
          style={{
            background:
              "linear-gradient(90deg,rgba(71, 55, 18, 1) 31%, rgba(201, 151, 75, 1) 100%, rgba(186, 176, 87, 1) 63%)",
          }}
        >
          <CardHeader className="text-center pb-6">
            <div
              className="flex items-center justify-center
             gap-2 mb-2"
            >
              <CardTitle className="text-2xl font-bold text-white animate-fade animate-once animate-duration-[400ms] animate-delay-0 animate-ease-in-out animate-alternate">
                <img
                  src="/logo.png"
                  alt="Logo"
                  className="h-[110px] max-h-[100px] w-auto max-w-[160px] object-contain rounded-full bg-[#472f12] p-1"
                />
              </CardTitle>
            </div>
            <CardDescription className="text-white text-base animate-jump animate-twice animate-duration-[400ms]">
              Conte-nos sobre suas preferências para recomendarmos os melhores
              livros!
            </CardDescription>
          </CardHeader>
        </Card>

        <Card className="mt-6 bg-white/90 backdrop-blur-sm shadow-xl border-0">
          <CardContent className="p-8">
            <form onSubmit={handleSubmit} className="space-y-8">
              {/* Dados Pessoais */}
              <div className="space-y-4">
                <div className="flex items-center gap-2 mb-4">
                  <User className="h-5 w-5" style={{ color: "#AF897A" }} />
                  <h3 className="text-lg font-semibold text-gray-800">
                    Dados Pessoais
                  </h3>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label
                      htmlFor="nomeCompleto"
                      className="text-gray-700 font-medium"
                    >
                      Nome Completo *
                    </Label>
                    <Input
                      id="nomeCompleto"
                      value={formData.nomeCompleto}
                      onChange={(e) =>
                        setFormData((prev) => ({
                          ...prev,
                          nomeCompleto: e.target.value,
                        }))
                      }
                      className="mt-1 border-gray-300"
                      style={
                        {
                          "--tw-ring-color": "#AF897A",
                          borderColor: "#AF897A",
                        } as React.CSSProperties
                      }
                      required
                    />
                  </div>

                  <div>
                    <Label
                      htmlFor="email"
                      className="text-gray-700 font-medium"
                    >
                      E-mail *
                    </Label>
                    <Input
                      id="email"
                      type="email"
                      value={formData.email}
                      onChange={(e) =>
                        setFormData((prev) => ({
                          ...prev,
                          email: e.target.value,
                        }))
                      }
                      className="mt-1 border-gray-300"
                      style={
                        {
                          "--tw-ring-color": "#AF897A",
                          borderColor: "#AF897A",
                        } as React.CSSProperties
                      }
                      required
                    />
                  </div>
                </div>

                <div>
                  <Label
                    htmlFor="telefone"
                    className="text-gray-700 font-medium"
                  >
                    Telefone
                  </Label>
                  <Input
                    id="telefone"
                    value={formData.telefone}
                    onChange={(e) =>
                      setFormData((prev) => ({
                        ...prev,
                        telefone: e.target.value,
                      }))
                    }
                    placeholder="(11) 99999-9999"
                    className="mt-1 border-gray-300"
                    style={
                      {
                        "--tw-ring-color": "#AF897A",
                        borderColor: "#AF897A",
                      } as React.CSSProperties
                    }
                  />
                </div>
              </div>

              {/* Preferências de Leitura */}
              <div className="space-y-4">
                <div className="flex items-center gap-2 mb-4">
                  <Heart className="h-5 w-5" style={{ color: "#AF897A" }} />
                  <h3 className="text-lg font-semibold text-gray-800">
                    Preferências de Leitura
                  </h3>
                </div>

                <div>
                  <Label className="text-gray-700 font-medium mb-3 block">
                    Gêneros Favoritos:
                  </Label>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                    {generos.map((genero) => (
                      <div key={genero} className="flex items-center space-x-2">
                        <Checkbox
                          id={genero}
                          checked={formData.generosFavoritos.includes(genero)}
                          onCheckedChange={(checked) =>
                            handleGenreChange(genero, checked as boolean)
                          }
                          className="border-gray-300"
                          style={
                            {
                              "--tw-ring-color": "#AF897A",
                            } as React.CSSProperties
                          }
                        />
                        <Label
                          htmlFor={genero}
                          className="text-sm text-gray-700"
                        >
                          {genero}
                        </Label>
                      </div>
                    ))}
                  </div>
                </div>

                <div>
                  <Label
                    htmlFor="outrosGeneros"
                    className="text-gray-700 font-medium"
                  >
                    Outros Gêneros
                  </Label>
                  <Input
                    id="outrosGeneros"
                    value={formData.outrosGeneros}
                    onChange={(e) =>
                      setFormData((prev) => ({
                        ...prev,
                        outrosGeneros: e.target.value,
                      }))
                    }
                    placeholder="Digite outros gêneros de seu interesse..."
                    className="mt-1 border-gray-300"
                    style={
                      {
                        "--tw-ring-color": "#AF897A",
                        borderColor: "#AF897A",
                      } as React.CSSProperties
                    }
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label className="text-gray-700 font-medium">
                      Formato Preferido
                    </Label>
                    <Select
                      value={formData.formatoPreferido}
                      onValueChange={(value) =>
                        setFormData((prev) => ({
                          ...prev,
                          formatoPreferido: value,
                        }))
                      }
                    >
                      <SelectTrigger className="mt-1 border-gray-300">
                        <SelectValue placeholder="Selecione..." />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="fisico">Físico</SelectItem>
                        <SelectItem value="ebook">E-book</SelectItem>
                        <SelectItem value="audiobook">Audiobook</SelectItem>
                        <SelectItem value="qualquer">
                          Qualquer formato
                        </SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <Label className="text-gray-700 font-medium">
                      Idioma Preferido
                    </Label>
                    <Select
                      value={formData.idiomaPreferido}
                      onValueChange={(value) =>
                        setFormData((prev) => ({
                          ...prev,
                          idiomaPreferido: value,
                        }))
                      }
                    >
                      <SelectTrigger className="mt-1 border-gray-300">
                        <SelectValue placeholder="Português" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="portugues">Português</SelectItem>
                        <SelectItem value="ingles">Inglês</SelectItem>
                        <SelectItem value="espanhol">Espanhol</SelectItem>
                        <SelectItem value="qualquer">
                          Qualquer idioma
                        </SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div>
                  <div className="flex items-center gap-2 mb-3">
                    <Clock className="h-4 w-4" style={{ color: "#AF897A" }} />
                    <Label className="text-gray-700 font-medium">
                      Frequência de Leitura:
                    </Label>
                  </div>
                  <RadioGroup
                    value={formData.frequenciaLeitura}
                    onValueChange={(value) =>
                      setFormData((prev) => ({
                        ...prev,
                        frequenciaLeitura: value,
                      }))
                    }
                    className="grid grid-cols-2 md:grid-cols-4 gap-4"
                  >
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem
                        value="diariamente"
                        id="diariamente"
                        className="border-gray-300"
                      />
                      <Label
                        htmlFor="diariamente"
                        className="text-sm text-gray-700"
                      >
                        Diariamente
                      </Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem
                        value="semanalmente"
                        id="semanalmente"
                        className="border-gray-300"
                      />
                      <Label
                        htmlFor="semanalmente"
                        className="text-sm text-gray-700"
                      >
                        Semanalmente
                      </Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem
                        value="mensalmente"
                        id="mensalmente"
                        className="border-gray-300"
                      />
                      <Label
                        htmlFor="mensalmente"
                        className="text-sm text-gray-700"
                      >
                        Mensalmente
                      </Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem
                        value="eventualmente"
                        id="eventualmente"
                        className="border-gray-300"
                      />
                      <Label
                        htmlFor="eventualmente"
                        className="text-sm text-gray-700"
                      >
                        Eventualmente
                      </Label>
                    </div>
                  </RadioGroup>
                </div>
              </div>

              {/* Informações Adicionais */}
              <div className="space-y-4">
                <div className="flex items-center gap-2 mb-4">
                  <MessageSquare
                    className="h-5 w-5"
                    style={{ color: "#AF897A" }}
                  />
                  <h3 className="text-lg font-semibold text-gray-800">
                    Informações Adicionais
                  </h3>
                </div>

                <div>
                  <Label
                    htmlFor="autoresFavoritos"
                    className="text-gray-700 font-medium"
                  >
                    Autores Favoritos
                  </Label>
                  <Input
                    id="autoresFavoritos"
                    value={formData.autoresFavoritos}
                    onChange={(e) =>
                      setFormData((prev) => ({
                        ...prev,
                        autoresFavoritos: e.target.value,
                      }))
                    }
                    placeholder="Ex: Machado de Assis, Agatha Christie..."
                    className="mt-1 border-gray-300"
                    style={
                      {
                        "--tw-ring-color": "#AF897A",
                        borderColor: "#AF897A",
                      } as React.CSSProperties
                    }
                  />
                </div>

                <div>
                  <Label
                    htmlFor="observacoes"
                    className="text-gray-700 font-medium"
                  >
                    Observações
                  </Label>
                  <Textarea
                    id="observacoes"
                    value={formData.observacoes}
                    onChange={(e) =>
                      setFormData((prev) => ({
                        ...prev,
                        observacoes: e.target.value,
                      }))
                    }
                    placeholder="Conte-nos mais sobre suas preferências de leitura..."
                    className="mt-1 border-gray-300 min-h-[100px]"
                    style={
                      {
                        "--tw-ring-color": "#AF897A",
                        borderColor: "#AF897A",
                      } as React.CSSProperties
                    }
                  />
                </div>
              </div>

              <Button
                type="submit"
                disabled={isSubmitting}
                className="w-full text-white font-semibold px-4 py-4 text-sm sm:text-base md:text-lg shadow-lg border-0 break-words whitespace-normal text-center"
                style={{
                  background:
                    "linear-gradient(90deg, rgba(71, 55, 18, 1) 31%, rgba(201, 151, 75, 1) 100%, rgba(186, 176, 87, 1) 63%)",
                }}
              >
                {isSubmitting
                  ? "Enviando..."
                  : "Confirmar Dados e Receber Recomendações"}
              </Button>

              {/* Status Messages */}
              {submitStatus === "success" && (
                <div className="bg-green-50 border border-green-200 rounded-lg p-4 text-center">
                  <p className="text-green-800 font-medium">
                    ✓ Cadastro realizado com sucesso!
                  </p>
                </div>
              )}

              {submitStatus === "error" && (
                <div className="bg-red-50 border border-red-200 rounded-lg p-4 text-center">
                  <p className="text-red-800 font-medium">
                    ✗ Erro ao processar cadastro.
                  </p>
                </div>
              )}
            </form>
          </CardContent>
        </Card>

        {/* Recommendations Dialog */}
        <Dialog
          open={showRecommendations}
          onOpenChange={setShowRecommendations}
        >
          <DialogContent className="max-w-4xl max-h-[80vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle
                className="text-2xl font-bold flex items-center gap-2"
                style={{ color: "#AF897A" }}
              >
                <LibraryBigIcon className="h-6 w-6" />
                Recomendações para {recommendations?.output.nomeUsuario}
              </DialogTitle>
            </DialogHeader>

            {recommendations && (
              <div className="space-y-6">
                <div className="grid gap-4">
                  {recommendations.output.recomendacoes.map((book, index) => (
                    <Card
                      key={index}
                      className="border-l-4"
                      style={{ borderLeftColor: "#AF897A" }}
                    >
                      <CardContent className="p-6">
                        <div className="space-y-3">
                          <div>
                            <h3 className="text-xl font-bold text-gray-800">
                              {book.titulo}
                            </h3>
                            <p className="text-gray-600">
                              por{" "}
                              <span className="font-semibold">
                                {book.autor}
                              </span>
                            </p>
                            <span
                              className="inline-block text-white text-sm px-3 py-1 rounded-full mt-2"
                              style={{ backgroundColor: "#AF897A" }}
                            >
                              {book.genero}
                            </span>
                          </div>

                          <div>
                            <h4 className="font-semibold text-gray-700 mb-1">
                              Por que recomendamos:
                            </h4>
                            <p className="text-gray-600 text-sm leading-relaxed">
                              {book.motivo}
                            </p>
                          </div>

                          {book.ondeEncontrar && (
                            <div>
                              <h4 className="font-semibold text-gray-700 mb-1">
                                Onde encontrar:
                              </h4>
                              <p className="text-gray-600 text-sm">
                                {book.ondeEncontrar}
                              </p>
                            </div>
                          )}
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>

                <div
                  className="border rounded-lg p-4 text-center"
                  style={{
                    backgroundColor: "#F2EBE2",
                    borderColor: "#AF897A",
                  }}
                >
                  <p className="font-medium" style={{ color: "#AF897A" }}>
                    {recommendations.output.mensagemFinal}
                  </p>
                </div>
              </div>
            )}
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
}
