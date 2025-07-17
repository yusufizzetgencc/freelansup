"use client";

import React, { useEffect, useState } from "react";
import axios from "axios";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { motion } from "framer-motion";
import { toast } from "sonner";

type BalanceTransaction = {
  id: string;
  type: "add" | "withdraw";
  amount: number;
  createdAt: string;
  status?: "pending" | "approved" | "rejected";
};

const BalancePage = () => {
  const [balance, setBalance] = useState<number>(0);
  const [transactions, setTransactions] = useState<BalanceTransaction[]>([]);
  const [amount, setAmount] = useState<number>(0);
  const [withdrawAmount, setWithdrawAmount] = useState<number>(0);
  const [iban, setIban] = useState<string>("");

  const fetchBalanceData = async () => {
    try {
      const res = await axios.get("/api/balance");
      setBalance(res.data.balance);
      setTransactions(
        res.data.transactions.sort(
          (a: BalanceTransaction, b: BalanceTransaction) =>
            new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
        )
      );
    } catch (err) {
      console.error("Bakiye verisi alınamadı", err);
    }
  };

  useEffect(() => {
    fetchBalanceData();
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="container max-w-4xl mx-auto py-12 px-4"
    >
      <h1 className="mt-7 text-3xl font-bold text-center mb-8 text-primary">
        Bakiye Yönetimi
      </h1>

      <div className="text-center mb-8">
        <p className="text-muted-foreground text-lg">Mevcut Bakiyeniz:</p>
        <p className="text-4xl font-bold text-green-600">₺{balance}</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <Card className="shadow-lg border border-yellow-300">
          <CardHeader>
            <CardTitle className="text-yellow-600">
              Uygulamaya Para Yükle
            </CardTitle>
          </CardHeader>
          <CardContent>
            <form
              className="space-y-4"
              onSubmit={async (e) => {
                e.preventDefault();
                try {
                  await axios.post("/api/balance/add", {
                    amount,
                  });
                  toast.success("Bakiyeniz başarıyla yüklendi.");
                  setAmount(0);
                  await fetchBalanceData(); // Refresh balance and transactions
                } catch {
                  toast.error("Yükleme sırasında bir hata oluştu.");
                }
              }}
            >
              <div>
                <Label htmlFor="amount">Yükleme Miktarı (₺)</Label>
                <Input
                  id="amount"
                  type="number"
                  min="1"
                  required
                  placeholder="Örn: 100"
                  value={amount}
                  onChange={(e) => setAmount(Number(e.target.value))}
                />
              </div>
              <Button
                type="submit"
                className="w-full bg-yellow-500 hover:bg-yellow-600 text-white"
              >
                Yükle
              </Button>
            </form>
          </CardContent>
        </Card>

        <Card className="shadow-lg border border-green-300">
          <CardHeader>
            <CardTitle className="text-green-600">
              Bakiyeyi Kendi Kartıma Çek
            </CardTitle>
          </CardHeader>
          <CardContent>
            <form
              className="space-y-4"
              onSubmit={async (e) => {
                e.preventDefault();
                try {
                  await axios.post("/api/balance/withdraw", {
                    amount: withdrawAmount,
                    description: `Kartıma çekim: ${iban}`,
                  });
                  toast.success("Çekim talebiniz başarıyla gönderildi.");
                  setWithdrawAmount(0);
                  setIban("");
                  await fetchBalanceData(); // Refresh after withdraw
                } catch (error) {
                  if (axios.isAxiosError(error)) {
                    toast.error(
                      error.response?.data || "Çekim sırasında bir hata oluştu."
                    );
                  } else {
                    toast.error("Beklenmeyen bir hata oluştu.");
                  }
                }
              }}
            >
              <div>
                <Label htmlFor="withdrawAmount">Çekilecek Miktar (₺)</Label>
                <Input
                  id="withdrawAmount"
                  type="number"
                  min="1"
                  required
                  placeholder="Örn: 250"
                  value={withdrawAmount}
                  onChange={(e) => setWithdrawAmount(Number(e.target.value))}
                />
              </div>
              <div>
                <Label htmlFor="iban">IBAN</Label>
                <Input
                  id="iban"
                  type="text"
                  required
                  placeholder="TR000000000000000000000000"
                  value={iban}
                  onChange={(e) => setIban(e.target.value)}
                />
              </div>
              <Button
                type="submit"
                className="w-full bg-green-500 hover:bg-green-600 text-white"
              >
                Çekim Talebi Gönder
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>

      <div className="mt-12">
        <h2 className="text-2xl font-semibold text-primary mb-4">
          İşlem Geçmişi
        </h2>
        <div className="border rounded-lg overflow-hidden shadow-sm divide-y divide-muted bg-white dark:bg-muted/40">
          <div className="grid grid-cols-3 px-4 py-2 font-semibold bg-gray-100 dark:bg-gray-800 text-gray-800 dark:text-gray-100">
            <div>Tarih</div>
            <div>İşlem</div>
            <div>Tutar</div>
          </div>
          {transactions.map((tx, idx) => (
            <motion.div
              key={tx.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
              className={`grid grid-cols-3 px-4 py-2 ${
                idx % 2 === 0 ? "bg-muted/50" : "bg-background"
              }`}
            >
              <div className="text-sm font-medium text-gray-900 dark:text-white">
                {new Date(tx.createdAt).toLocaleDateString()}
              </div>
              <div className="text-sm font-medium text-gray-900 dark:text-white">
                {tx.type === "add" ? "Yükleme" : "Çekim"}
              </div>
              <div>
                <span
                  className={`px-2 py-1 rounded-md inline-block text-sm font-semibold ${
                    tx.type === "add"
                      ? "bg-green-100 text-green-700"
                      : "bg-red-100 text-red-700"
                  }`}
                >
                  {tx.amount} ₺
                </span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </motion.div>
  );
};

export default BalancePage;
