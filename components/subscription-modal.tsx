'use client'


import { useState, useEffect } from 'react'
import { Dialog, DialogContent } from "@/components/ui/dialog"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Progress } from "@/components/ui/progress"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { maskCPF } from "@/lib/masks";
import { motion } from 'framer-motion'
import axios from 'axios'
import { QRCodeCanvas } from 'qrcode.react';

import { CheckCircle, Lock, Zap, ShieldCheck, Rocket, Loader2, Scan, Smartphone, Copy, QrCode } from 'lucide-react'
import Image from 'next/image'

interface SubscriptionModalProps {
  isOpen: boolean
  onClose: () => void
  plan: {
    name: string
    price: string
    economy?: string
  } | null
}

export function SubscriptionModal({ isOpen, onClose, plan }: SubscriptionModalProps) {
  const [paymentStep, setPaymentStep] = useState<'form' | 'loading' | 'qrCode' | 'pixCopyPaste'| 'success'>('form');
  const [qrCodeData, setQrCodeData] = useState<{ value: string; qrCodeImage: string; pixCode: string } | null>(null);
  const [copySuccess, setCopySuccess] = useState(false);
  const [cpf, setCpf] = useState("");
  const [paid, setPaid] = useState(false)
  const [id, setId] = useState(0);

  // Effect to trigger success state after QR code generation
  useEffect(() => {
  let interval: NodeJS.Timeout;

  if (paymentStep === 'qrCode' && id > 0) {
    interval = setInterval(async () => {
      try {
        const res = await axios.get(`https://api-checkout-one.vercel.app/transaction/${id}`);
        const status = res.data.status;

        if (status === 'paid') {
          clearInterval(interval);
          setPaid(true);
          setPaymentStep('success'); // novo passo para exibir mensagem
        }
      } catch (err) {
        console.error('Erro ao verificar status do pagamento:', err);
      }
    }, 3000); // checa a cada 3 segundos
  }

  return () => clearInterval(interval); // limpa o intervalo ao desmontar
}, [paymentStep, id]);
  // Handler para atualizar o input com máscara
  const handleCpfChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setCpf(maskCPF(value));
  };

  const handlePaymentStatus = async () =>{
    try {
      if(id > 0){
        
      }
    } catch (error) {
       console.error('Erro ao criar transação:', error);
      alert("Erro ao criar transação. Verifique os dados e tente novamente.");
    }
  }
  const handlePayment = async () => {
    setPaymentStep('loading');

    const fullName = (document.getElementById('fullName') as HTMLInputElement)?.value;
    const email = (document.getElementById('email') as HTMLInputElement)?.value;
    const cpfSemFormatacao = cpf.replace(/\D/g, "")

    const payload = {
      name: fullName,
      email,
      cpf: cpfSemFormatacao,
      amount: parseInt(
        plan?.price?.replace(/[^\d,]/g, '')?.replace(',', '')
      ) || 0 // Ex: "R$ 49,90" -> "4990"
    };
    console.log()
    try {
      const response = await axios.post('https://api-checkout-one.vercel.app/create-transaction', payload);

      const pixCode = response.data.qrcode; // <- a resposta é uma string direta
      const id = response.data.id;
      //pegando Id da requisição
      setId(id);

      setQrCodeData({
        value: `R$ ${plan?.price}`,
        qrCodeImage: '', // não vamos usar imagem
        pixCode: pixCode
      });

      setPaymentStep('qrCode');
    } catch (error) {
      console.error('Erro ao criar transação:', error);
      alert("Erro ao criar transação. Verifique os dados e tente novamente.");
      setPaymentStep('form');
    }
  };


  const handleCopyPixCode = () => {
    if (qrCodeData?.pixCode) {
      navigator.clipboard.writeText(qrCodeData.pixCode);
      setCopySuccess(true);
      setTimeout(() => setCopySuccess(false), 2000); // Reset success message after 2 seconds
    }
  };

  if (!plan) return null

  return (
    <Dialog open={isOpen} onOpenChange={() => {
      setPaymentStep('form'); // Reset step when closing
      setQrCodeData(null); // Clear QR code data
      setCopySuccess(false); // Clear copy success state
      onClose();
    }}>
      <DialogContent className="w-full max-w-[calc(100vw-2rem)] sm:max-w-[425px] p-0 rounded-lg max-h-[90vh] overflow-y-auto">
        {paymentStep === 'form' && (
          <>
            <div className="p-4 border-b border-gray-200 flex items-center gap-3">
              <Avatar className="w-10 h-10">
                <AvatarImage src="/perfil-negrini.jpeg" alt="Isadora Vale" />
                <AvatarFallback>IV</AvatarFallback>
              </Avatar>
              <div>
                <p className="font-semibold text-sm">Alessandra Negrini</p>
                <p className="text-xs text-gray-500">@negrini</p>
              </div>
            </div>

            <div className="p-4">
              {/* Selected Plan Info */}
              <div className="bg-gradient-to-r from-orange-400 to-red-400 text-white p-4 rounded-lg mb-4">
                <p className="font-bold text-lg">
                  Plano selecionado: {plan.name} - {plan.price}
                </p>
                {plan.economy && (
                  <p className="text-sm mt-1">{plan.economy}</p>
                )}
              </div>

              {/* Progress Bar */}
              <div className="mb-6">
                <div className="flex items-center justify-between text-sm text-gray-500 mb-1">
                  <div className="w-1/2 h-1 bg-orange-500 rounded-full"></div>
                  <div className="w-1/2 h-1 bg-gray-200 rounded-full"></div>
                </div>
                <p className="text-center text-sm text-gray-500">Progresso do checkout: 50%</p>
              </div>

              {/* Basic Data Form */}
              <div className="mb-6">
                <h3 className="font-bold text-lg mb-1">Dados Básicos</h3>
                <p className="text-sm text-gray-500 mb-4">Precisamos apenas das informações essenciais</p>

                <div className="space-y-4">
                  <div>
                    <Label htmlFor="fullName" className="text-sm font-medium text-gray-700">
                      Nome completo
                    </Label>
                    <Input id="fullName" placeholder="Digite seu nome completo" className="mt-1" />
                  </div>
                  <div>
                    <Label htmlFor="email" className="text-sm font-medium text-gray-700">
                      E-mail
                    </Label>
                    <Input id="email" type="email" placeholder="Digite seu melhor e-mail" className="mt-1" />
                  </div>
                  <div>
                    <Label htmlFor="phone" className="text-sm font-medium text-gray-700">
                      cpf
                    </Label>
                    <Input
                      id="cpf"
                      placeholder="000.000.000-00"
                      className="mt-1"
                      value={cpf}
                      onChange={handleCpfChange}
                      maxLength={14} // 000.000.000-00
                    />
                  </div>
                </div>
              </div>

              {/* Security Indicators */}
              <div className="flex justify-center gap-4 text-sm text-gray-500 mb-6">
                <div className="flex items-center gap-1">
                  <CheckCircle className="w-4 h-4 text-green-500" />
                  <span>Seguro</span>
                </div>
                <div className="flex items-center gap-1">
                  <Lock className="w-4 h-4 text-blue-500" />
                  <span>Privado</span>
                </div>
                <div className="flex items-center gap-1">
                  <Zap className="w-4 h-4 text-yellow-500" />
                  <span>Rápido</span>
                </div>
              </div>

              {/* Payment Button */}
              <button
                onClick={handlePayment}
                className="w-full bg-gradient-to-r from-orange-500 to-red-500 text-white py-3 rounded-lg flex items-center justify-center gap-2 text-lg font-bold mb-4"
              >
                <Rocket className="w-5 h-5" />
                Pagar com PIX - {plan.price}
              </button>

              {/* SSL Protection Message */}
              <div className="flex items-center justify-center gap-2 text-green-700 text-sm">
                <ShieldCheck className="w-5 h-5" />
                <span>Seus dados estão protegidos com criptografia SSL</span>
              </div>
            </div>
          </>
        )}

        {paymentStep === 'loading' && (
          <div className="flex flex-col items-center justify-center h-[400px] p-4">
            <Loader2 className="h-12 w-12 animate-spin text-orange-500" />
            <p className="mt-4 text-lg font-semibold text-gray-700">Gerando QR Code...</p>
            <p className="text-sm text-gray-500">Aguarde um momento.</p>
          </div>
        )}

        {paymentStep === 'qrCode' && qrCodeData && (
          <div className="p-6 text-center">
            <h3 className="text-lg font-semibold mb-2">Efetue o pagamento agora mesmo</h3>
            <p className="text-xl font-bold text-orange-500 mb-4">escaneando o QR Code</p>
            <div className="flex items-center justify-center gap-2 text-gray-600 text-sm mb-4">
              <Scan className="w-4 h-4" />
              <span>Aponte a câmera do seu celular</span>
            </div>

            <p className="text-lg font-semibold mb-2">
              Valor no pix: <span className="text-green-600">{qrCodeData.value}</span>
            </p>
            <div className="flex justify-center mb-6">
              {/* <Image
                src={qrCodeData.qrCodeImage || "/placeholder.svg"}
                alt="QR Code for PIX payment"
                width={200}
                height={200}
                className="border border-gray-200 p-2 rounded-lg"
              /> */}
              <QRCodeCanvas
                value={qrCodeData.pixCode}
                size={200}
                bgColor={"#ffffff"}
                fgColor={"#000000"}
                level={"H"}
                includeMargin={true}
              />
            </div>

            <div className="text-left mb-6">
              <h4 className="font-bold text-lg mb-2 text-center">Como pagar o seu pedido</h4>
              <div className="flex items-start gap-2 mb-2">
                <Smartphone className="w-5 h-5 text-gray-600 flex-shrink-0 mt-1" />
                <p className="text-sm text-gray-700">
                  Abra o aplicativo do seu banco e selecione <span className="font-bold">QR Code</span> na opção de pagamento por PIX.
                </p>
              </div>
              <div className="flex items-start gap-2">
                <Scan className="w-5 h-5 text-gray-600 flex-shrink-0 mt-1" />
                <p className="text-sm text-gray-700">
                  Utilize a câmera do celular para <span className="font-bold">escanear o QR Code</span> certifique-se que os dados estão corretos e finalize o pagamento.
                </p>
              </div>
            </div>

            <p className="text-gray-500 font-semibold mb-4">OU</p>

            <button
              onClick={() => setPaymentStep('pixCopyPaste')}
              className="w-full bg-blue-600 text-white py-3 rounded-lg flex items-center justify-center gap-2 text-lg font-bold"
            >
              <Copy className="w-5 h-5" />
              UTILIZAR PIX COPIA E COLA
            </button>
          </div>
        )}

        {paymentStep === 'pixCopyPaste' && qrCodeData && (
          <div className="p-6 text-center">
            <h3 className="text-lg font-semibold mb-4">Pague através do código PIX copia e cola</h3>

            <p className="text-lg font-semibold mb-2">
              Valor no pix: <span className="text-green-600">{qrCodeData.value}</span>
            </p>

            <div className="flex items-center border border-green-500 rounded-lg overflow-hidden mb-6">
              <Input
                type="text"
                value={qrCodeData.pixCode}
                readOnly
                className="flex-grow border-none focus-visible:ring-0 text-sm px-3 py-2"
              />
              <button
                onClick={handleCopyPixCode}
                className="bg-green-500 text-white px-4 py-2 flex items-center gap-2 h-full"
              >
                <Copy className="w-4 h-4" />
                {copySuccess ? 'Copiado!' : 'Copiar código pix'}
              </button>
            </div>

            <div className="text-left mb-6">
              <h4 className="font-bold text-lg mb-2 text-center">Como pagar o seu pedido</h4>
              <div className="flex items-start gap-2 mb-2">
                <Copy className="w-5 h-5 text-gray-600 flex-shrink-0 mt-1" />
                <p className="text-sm text-gray-700">
                  Copie o código acima clicando no botão
                </p>
              </div>
              <div className="flex items-start gap-2">
                <Smartphone className="w-5 h-5 text-gray-600 flex-shrink-0 mt-1" />
                <p className="text-sm text-gray-700">
                  Abra o aplicativo de seu banco e selecione <span className="font-bold">Copia e Cola</span> na opção de pagamento por PIX.
                  Certifique-se que os dados estão corretos e finalize o pagamento.
                </p>
              </div>
            </div>

            <p className="text-gray-500 font-semibold mb-4">OU</p>

            <button
              onClick={() => setPaymentStep('qrCode')}
              className="w-full bg-blue-600 text-white py-3 rounded-lg flex items-center justify-center gap-2 text-lg font-bold"
            >
              <QrCode className="w-5 h-5" />
              MOSTRAR QR CODE
            </button>
          </div>
        )}
          {paymentStep === 'success' && (
          <div className="p-6 text-center flex flex-col items-center justify-center h-[400px]">
            {/* Title */}
            <h2 className="text-2xl font-bold text-gray-800 mb-4">
              Pagamento realizado com Sucesso
            </h2>

            {/* Animated Check Icon */}
            <motion.div
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ type: "spring", stiffness: 260, damping: 20 }}
              className="bg-green-100 rounded-full p-4 mb-6"
            >
              <CheckCircle className="w-24 h-24 text-green-600" />
            </motion.div>

            {/* Message */}
            <p className="text-lg text-gray-600">
              Você receberá informações via email
            </p>
          </div>
        )}
      </DialogContent>
    </Dialog>
  )
}
