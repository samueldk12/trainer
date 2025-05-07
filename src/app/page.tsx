import { Button } from '@/components/ui/Button';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/Card';
import Link from 'next/link';
import { FaDumbbell, FaCalendarAlt, FaChartLine, FaPlus } from 'react-icons/fa';

export default function Home() {
  return (
    <div className="space-y-6">
      <section className="text-center py-6">
        <h1 className="text-3xl font-bold mb-2">TrainerYS</h1>
        <p className="text-gray-600 max-w-md mx-auto">
          Seu aplicativo para controle de treinos em casa, com cronômetro,
          calendário e monitoramento de progresso.
        </p>
      </section>

      <section className="grid gap-4 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <FaDumbbell className="mr-2" /> Treinos
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p>Crie e gerencie seus treinos personalizados para exercícios em casa.</p>
          </CardContent>
          <CardFooter>
            <Link href="/treinos" className="w-full">
              <Button className="w-full">Ver Treinos</Button>
            </Link>
          </CardFooter>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <FaCalendarAlt className="mr-2" /> Calendário
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p>Acompanhe sua consistência e veja os dias em que completou seus treinos.</p>
          </CardContent>
          <CardFooter>
            <Link href="/calendario" className="w-full">
              <Button className="w-full" variant="outline">Ver Calendário</Button>
            </Link>
          </CardFooter>
        </Card>

        <Card className="md:col-span-2 lg:col-span-1">
          <CardHeader>
            <CardTitle className="flex items-center">
              <FaChartLine className="mr-2" /> Progresso
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p>Visualize e analise seu progresso, incluindo calorias queimadas e tempo de exercício.</p>
          </CardContent>
          <CardFooter>
            <Link href="/progresso" className="w-full">
              <Button className="w-full" variant="outline">Ver Progresso</Button>
            </Link>
          </CardFooter>
        </Card>
      </section>

      <section className="mt-8 text-center">
        <Link href="/treinos/novo">
          <Button size="lg" className="gap-2">
            <FaPlus /> Novo Treino
          </Button>
        </Link>
      </section>
    </div>
  );
}
