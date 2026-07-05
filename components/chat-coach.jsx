"use client";

import React, { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { 
  Bot, 
  X, 
  Send, 
  Sparkles, 
  RefreshCw, 
  TrendingUp, 
  DollarSign, 
  AlertCircle,
  MessageSquareQuote
} from "lucide-react";
import { askFinancialCoach } from "@/actions/chat";
import { toast } from "sonner";

const SUGGESTED_PROMPTS = [
  { text: "Analyze my recent transactions", icon: <TrendingUp className="h-3.5 w-3.5 text-blue-500" /> },
  { text: "Are my budgets safe?", icon: <AlertCircle className="h-3.5 w-3.5 text-amber-500" /> },
  { text: "Give me 3 tips to save money", icon: <DollarSign className="h-3.5 w-3.5 text-emerald-500" /> }
];

export default function ChatCoach() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef(null);

  // Auto-scroll to bottom of message list on updates
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    if (isOpen) {
      scrollToBottom();
    }
  }, [messages, isLoading, isOpen]);

  const handleSend = async (textToSend) => {
    const text = textToSend || input;
    if (!text.trim() || isLoading) return;

    const userMessage = { role: "user", content: text };
    const updatedMessages = [...messages, userMessage];
    
    setMessages(updatedMessages);
    setInput("");
    setIsLoading(true);

    try {
      const response = await askFinancialCoach(updatedMessages);
      
      if (response.success) {
        setMessages([...updatedMessages, { role: "model", content: response.text }]);
      } else {
        toast.error(response.error || "Failed to get response from AI coach.");
        setMessages([...updatedMessages, { 
          role: "model", 
          content: "Sorry, I encountered an issue connecting to my brain. Please check your network and make sure the Gemini API key is configured correctly!" 
        }]);
      }
    } catch (err) {
      console.error(err);
      toast.error("Network error when connecting to AI coach.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      handleSend();
    }
  };

  const clearChat = () => {
    setMessages([]);
    toast.success("Chat history cleared!");
  };

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end">
      {/* Floating Chat Window */}
      {isOpen && (
        <Card className="w-[360px] h-[520px] mb-4 shadow-2xl border border-border flex flex-col bg-background animate-in slide-in-from-bottom-5 duration-300">
          {/* Header */}
          <CardHeader className="p-4 bg-gradient-to-r from-blue-600 to-indigo-700 text-white rounded-t-xl flex flex-row items-center justify-between space-y-0">
            <div className="flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-full bg-white/10 flex items-center justify-center border border-white/20">
                <Bot className="h-5 w-5 text-white" />
              </div>
              <div>
                <CardTitle className="text-sm font-black flex items-center gap-1">
                  Welth AI Coach <Sparkles className="h-3 w-3 text-amber-300 animate-pulse" />
                </CardTitle>
                <CardDescription className="text-[10px] text-blue-100 flex items-center gap-1 font-medium">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-450 animate-ping"></span> Live Account Analytics
                </CardDescription>
              </div>
            </div>
            <div className="flex items-center gap-1">
              {messages.length > 0 && (
                <Button 
                  variant="ghost" 
                  size="icon" 
                  onClick={clearChat}
                  title="Clear conversation"
                  className="h-8 w-8 text-white/80 hover:text-white hover:bg-white/10 rounded-full"
                >
                  <RefreshCw className="h-3.5 w-3.5" />
                </Button>
              )}
              <Button 
                variant="ghost" 
                size="icon" 
                onClick={() => setIsOpen(false)}
                className="h-8 w-8 text-white/80 hover:text-white hover:bg-white/10 rounded-full"
              >
                <X className="h-4 w-4" />
              </Button>
            </div>
          </CardHeader>

          {/* Chat Messages Area */}
          <CardContent className="flex-1 overflow-y-auto p-4 space-y-4">
            {messages.length === 0 ? (
              <div className="h-full flex flex-col justify-center items-center text-center space-y-4 px-2">
                <div className="w-12 h-12 rounded-2xl bg-blue-50 dark:bg-blue-950/40 flex items-center justify-center border border-blue-100 dark:border-blue-900/30">
                  <MessageSquareQuote className="h-6 w-6 text-blue-600 dark:text-blue-400" />
                </div>
                <div className="space-y-1">
                  <h4 className="text-sm font-bold">Ask your AI Financial Coach</h4>
                  <p className="text-[11px] text-muted-foreground leading-relaxed">
                    Hi! I'm Welth AI. I can review your transactions and accounts to help you analyze trends, find savings, and answer financial questions.
                  </p>
                </div>
              </div>
            ) : (
              messages.map((msg, index) => (
                <div 
                  key={index} 
                  className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"} items-start gap-2`}
                >
                  {msg.role !== "user" && (
                    <div className="w-7 h-7 rounded-full bg-blue-50 dark:bg-blue-950/40 border border-blue-100 dark:border-blue-900/30 flex items-center justify-center shrink-0 mt-0.5">
                      <Bot className="h-4 w-4 text-blue-650" />
                    </div>
                  )}
                  <div 
                    className={`max-w-[78%] rounded-xl px-3 py-2 text-xs leading-relaxed ${
                      msg.role === "user" 
                        ? "bg-blue-600 text-white rounded-tr-none font-medium" 
                        : "bg-muted text-foreground rounded-tl-none prose dark:prose-invert"
                    }`}
                  >
                    {/* Render raw markdown break tags for model text */}
                    {msg.role === "user" ? (
                      msg.content
                    ) : (
                      <span className="whitespace-pre-line block">
                        {msg.content}
                      </span>
                    )}
                  </div>
                </div>
              ))
            )}

            {/* AI Typing Indicator */}
            {isLoading && (
              <div className="flex justify-start items-start gap-2">
                <div className="w-7 h-7 rounded-full bg-blue-50 dark:bg-blue-950/40 border border-blue-100 dark:border-blue-900/30 flex items-center justify-center shrink-0 mt-0.5">
                  <Bot className="h-4 w-4 text-blue-650" />
                </div>
                <div className="bg-muted text-foreground rounded-xl rounded-tl-none px-3.5 py-3 text-xs flex items-center gap-1">
                  <span className="w-1.5 h-1.5 bg-muted-foreground/60 rounded-full animate-bounce duration-600"></span>
                  <span className="w-1.5 h-1.5 bg-muted-foreground/60 rounded-full animate-bounce duration-600 delay-150"></span>
                  <span className="w-1.5 h-1.5 bg-muted-foreground/60 rounded-full animate-bounce duration-600 delay-300"></span>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </CardContent>

          {/* Quick suggestions area */}
          {messages.length === 0 && (
            <div className="px-4 pb-2 pt-0 space-y-1.5 border-t border-dashed border-border bg-gray-50/20 dark:bg-gray-900/10">
              <span className="text-[9px] font-bold text-muted-foreground uppercase tracking-widest block pt-2">Suggestions:</span>
              <div className="flex flex-col gap-1.5">
                {SUGGESTED_PROMPTS.map((prompt, idx) => (
                  <button
                    key={idx}
                    onClick={() => handleSend(prompt.text)}
                    className="text-left text-[11px] p-2 bg-background hover:bg-muted border rounded-lg flex items-center gap-2 hover:shadow-xs active:scale-98 transition-all"
                  >
                    {prompt.icon}
                    <span className="font-semibold text-muted-foreground hover:text-foreground">{prompt.text}</span>
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Footer Input Area */}
          <CardFooter className="p-3 border-t bg-gray-50/50 dark:bg-gray-900/50 rounded-b-xl flex items-center gap-2">
            <Input 
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKeyDown}
              disabled={isLoading}
              placeholder="Ask anything about your money..."
              className="flex-1 text-xs border bg-background"
            />
            <Button 
              size="icon" 
              onClick={() => handleSend()}
              disabled={!input.trim() || isLoading}
              className="h-8 w-8 bg-blue-600 hover:bg-blue-700 text-white shrink-0 active:scale-95 transition-all"
            >
              <Send className="h-4 w-4" />
            </Button>
          </CardFooter>
        </Card>
      )}

      {/* Pulsing Floating Button */}
      <Button 
        onClick={() => setIsOpen(!isOpen)}
        className="w-14 h-14 rounded-full bg-gradient-to-r from-blue-600 to-indigo-700 text-white shadow-xl hover:shadow-2xl flex items-center justify-center border border-blue-500/30 hover:scale-105 active:scale-95 transition-all duration-300 relative group"
      >
        <Bot className="h-7 w-7 text-white group-hover:rotate-12 transition-transform duration-300" />
        <span className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-emerald-500 border-2 border-white dark:border-gray-950 animate-pulse"></span>
      </Button>
    </div>
  );
}
