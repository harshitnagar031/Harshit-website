import { motion } from "framer-motion";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { useQuery } from "@tanstack/react-query";
import { format } from "date-fns";

type Message = {
  id: number;
  name: string;
  email: string;
  message: string;
  createdAt: string;
};

export function AdminPanel() {
  const { data: messages, isLoading, error } = useQuery<Message[]>({
    queryKey: ['/api/admin/messages'],
  });

  if (isLoading) {
    return <div className="text-[#ADBAC7]">Loading messages...</div>;
  }

  if (error) {
    return <div className="text-red-500">Failed to load messages</div>;
  }

  return (
    <section className="py-24 bg-[#22272E]" id="admin">
      <div className="container px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="text-3xl font-bold text-[#ADBAC7] mb-8 font-mono">Contact Messages</h2>
          <div className="space-y-4">
            {messages?.map((message) => (
              <Card key={message.id} className="bg-[#2D333B] border-none">
                <CardHeader>
                  <div className="flex justify-between items-center">
                    <h3 className="text-lg font-semibold text-[#ADBAC7]">
                      From: {message.name}
                    </h3>
                    <span className="text-sm text-[#768390]">
                      {format(new Date(message.createdAt), 'PPpp')}
                    </span>
                  </div>
                  <p className="text-[#768390]">{message.email}</p>
                </CardHeader>
                <CardContent>
                  <p className="text-[#ADBAC7] whitespace-pre-wrap">{message.message}</p>
                </CardContent>
              </Card>
            ))}
            {messages?.length === 0 && (
              <div className="text-center text-[#768390]">
                No messages yet
              </div>
            )}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
