import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { AlertTriangle, Plane, CheckCircle, XCircle } from 'lucide-react';

type GameState = 'difficulty' | 'intro' | 'scenario1' | 'scenario2' | 'scenario3' | 'ending';
type Outcome = 'success' | 'crash' | 'disaster' | null;
type Difficulty = 'easy' | 'hard';

interface GameProgress {
  state: GameState;
  outcome: Outcome;
  decisions: string[];
  difficulty: Difficulty;
  stats: {
    altitude: number;
    fuel: number;
    engineStatus: number;
  };
}

export function EmergencyLanding() {
  const [game, setGame] = useState<GameProgress>({
    state: 'difficulty',
    outcome: null,
    decisions: [],
    difficulty: 'easy',
    stats: {
      altitude: 35000,
      fuel: 50,
      engineStatus: 100,
    },
  });

  const startGame = (difficulty: Difficulty) => {
    setGame((prev) => ({
      ...prev,
      state: 'intro',
      difficulty,
      stats:
        difficulty === 'easy'
          ? { altitude: 35000, fuel: 75, engineStatus: 100 }
          : { altitude: 35000, fuel: 50, engineStatus: 100 },
    }));
  };

  const makeChoice = (choice: string, nextState: GameState, outcome?: Outcome) => {
    const isEasy = game.difficulty === 'easy';
    setGame((prev) => ({
      ...prev,
      state: nextState,
      outcome: outcome || prev.outcome,
      decisions: [...prev.decisions, choice],
      stats:
        nextState === 'scenario1'
          ? isEasy
            ? { altitude: 28000, fuel: 70, engineStatus: 75 }
            : { altitude: 25000, fuel: 45, engineStatus: 60 }
          : nextState === 'scenario2'
            ? {
                altitude: prev.stats.altitude - (isEasy ? 3000 : 5000),
                fuel: prev.stats.fuel - (isEasy ? 5 : 10),
                engineStatus: prev.stats.engineStatus - (isEasy ? 10 : 20),
              }
            : prev.stats,
    }));
  };

  const restart = () => {
    setGame({
      state: 'difficulty',
      outcome: null,
      decisions: [],
      difficulty: 'easy',
      stats: {
        altitude: 35000,
        fuel: 50,
        engineStatus: 100,
      },
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-sky-400 to-sky-200 flex items-center justify-center p-4">
      <Card className="w-full max-w-2xl p-8 bg-white shadow-2xl">
        {/* Difficulty Selection */}
        {game.state === 'difficulty' && (
          <div className="space-y-6">
            <div className="flex items-center gap-3">
              <Plane className="w-12 h-12 text-blue-600" />
              <h1 className="text-4xl font-bold text-gray-900">Emergency Landing</h1>
            </div>
            <p className="text-lg text-gray-700">
              Choose your difficulty level. Your choices will determine the fate of the aircraft and its passengers.
            </p>

            <div className="grid grid-cols-2 gap-4">
              <Button
                size="lg"
                onClick={() => startGame('easy')}
                className="h-auto py-6 flex flex-col items-center gap-2 bg-green-600 hover:bg-green-700 text-white"
              >
                <span className="text-xl font-bold">Easy</span>
                <span className="text-sm">More fuel, forgiving physics</span>
              </Button>
              <Button
                size="lg"
                onClick={() => startGame('hard')}
                className="h-auto py-6 flex flex-col items-center gap-2 bg-red-600 hover:bg-red-700 text-white"
              >
                <span className="text-xl font-bold">Hard</span>
                <span className="text-sm">Limited fuel, realistic physics</span>
              </Button>
            </div>
          </div>
        )}

        {/* Intro Screen */}
        {game.state === 'intro' && (
          <div className="space-y-6">
            <div className="flex items-center gap-3">
              <AlertTriangle className="w-12 h-12 text-red-600" />
              <h1 className="text-4xl font-bold text-gray-900">Emergency Landing</h1>
            </div>
            <p className="text-lg text-gray-700">
              You're the pilot of a commercial aircraft. Both engines are failing. You have minutes to make critical decisions that will determine the fate of your passengers.
            </p>
            <div className="bg-blue-50 border-l-4 border-blue-500 p-4">
              <p className="text-sm text-gray-700">
                <strong>Difficulty:</strong> {game.difficulty === 'easy' ? '🟢 Easy' : '🔴 Hard'}
              </p>
              <p className="text-sm text-gray-700">
                <strong>Current Status:</strong> Altitude: {game.stats.altitude}ft | Fuel: {game.stats.fuel}% | Engines: {game.stats.engineStatus}%
              </p>
            </div>
            <Button
              size="lg"
              onClick={() => makeChoice('Started Emergency Protocol', 'scenario1')}
              className="w-full bg-red-600 hover:bg-red-700 text-white text-lg"
            >
              Begin Emergency Protocol
            </Button>
          </div>
        )}

        {/* Scenario 1: Engine Failure */}
        {game.state === 'scenario1' && (
          <div className="space-y-6">
            <div className="flex items-center gap-3">
              <Plane className="w-10 h-10 text-orange-600" />
              <h2 className="text-2xl font-bold text-gray-900">Engine #1 Failure Detected</h2>
            </div>
            <p className="text-gray-700">
              Alarms blaring. Engine #1 is completely offline. You need to stabilize the aircraft immediately.
            </p>
            <div className="bg-orange-50 border-l-4 border-orange-500 p-4 space-y-2">
              <p className="text-sm font-semibold text-gray-900">Critical Decision:</p>
              <p className="text-sm text-gray-700">
                Altitude: {game.stats.altitude}ft | Fuel: {game.stats.fuel}% | Engines: {game.stats.engineStatus}%
              </p>
            </div>

            <div className="space-y-3">
              <Button
                variant="outline"
                className="w-full justify-start text-left h-auto py-4"
                onClick={() => makeChoice('Shut down Engine #2 to cool systems', 'scenario2')}
              >
                <span className="font-semibold">Option A:</span> Shut down Engine #2 to prevent cascade failure
              </Button>
              <Button
                variant="outline"
                className="w-full justify-start text-left h-auto py-4"
                onClick={() => makeChoice('Keep both engines running', 'scenario2')}
              >
                <span className="font-semibold">Option B:</span> Keep Engine #2 running for maximum power
              </Button>
              <Button
                variant="outline"
                className="w-full justify-start text-left h-auto py-4"
                onClick={() => makeChoice('Attempt emergency restart', 'scenario2')}
              >
                <span className="font-semibold">Option C:</span> Attempt emergency restart of Engine #1
              </Button>
            </div>
          </div>
        )}

        {/* Scenario 2: Landing Site Selection */}
        {game.state === 'scenario2' && (
          <div className="space-y-6">
            <div className="flex items-center gap-3">
              <AlertTriangle className="w-10 h-10 text-yellow-600" />
              <h2 className="text-2xl font-bold text-gray-900">Choose Landing Site</h2>
            </div>
            <p className="text-gray-700">
              You have limited fuel and altitude. Three landing options are available. Choose wisely.
            </p>
            <div className="bg-yellow-50 border-l-4 border-yellow-500 p-4 space-y-2">
              <p className="text-sm font-semibold text-gray-900">Current Status:</p>
              <p className="text-sm text-gray-700">
                Altitude: {game.stats.altitude}ft | Fuel: {game.stats.fuel}% | Engines: {game.stats.engineStatus}%
              </p>
            </div>

            <div className="space-y-3">
              <Button
                variant="outline"
                className="w-full justify-start text-left h-auto py-4"
                onClick={() => makeChoice('Land at nearest airport (35 miles)', 'scenario3')}
              >
                <span className="font-semibold">Option A:</span> Nearest airport 35 miles away - risky fuel calculation
              </Button>
              <Button
                variant="outline"
                className="w-full justify-start text-left h-auto py-4"
                onClick={() => makeChoice('Emergency water landing', 'scenario3')}
              >
                <span className="font-semibold">Option B:</span> Controlled water landing in nearby ocean - safer altitude
              </Button>
              <Button
                variant="outline"
                className="w-full justify-start text-left h-auto py-4"
                onClick={() => makeChoice('Attempt to reach military base', 'scenario3')}
              >
                <span className="font-semibold">Option C:</span> Military base with emergency equipment - 50 miles away
              </Button>
            </div>
          </div>
        )}

        {/* Scenario 3: Final Approach */}
        {game.state === 'scenario3' && (
          <div className="space-y-6">
            <div className="flex items-center gap-3">
              <AlertTriangle className="w-10 h-10 text-red-600" />
              <h2 className="text-2xl font-bold text-gray-900">Final Approach - Execute Landing</h2>
            </div>
            <p className="text-gray-700">
              You're on final approach. Make your last critical decision to save everyone on board.
            </p>
            <div className="bg-red-50 border-l-4 border-red-500 p-4 space-y-2">
              <p className="text-sm font-semibold text-gray-900">Critical Status:</p>
              <p className="text-sm text-gray-700">
                Altitude: {game.stats.altitude}ft | Fuel: {game.stats.fuel}% | Engines: {game.stats.engineStatus}%
              </p>
            </div>

            <div className="space-y-3">
              <Button
                variant="outline"
                className="w-full justify-start text-left h-auto py-4"
                onClick={() => makeChoice('Full flaps for maximum control', 'ending', 'success')}
              >
                <span className="font-semibold">Option A:</span> Deploy full flaps for maximum control - textbook approach
              </Button>
              <Button
                variant="outline"
                className="w-full justify-start text-left h-auto py-4"
                onClick={() => makeChoice('Minimal flaps, maximum speed', 'ending', 'crash')}
              >
                <span className="font-semibold">Option B:</span> Minimal flaps, maintain speed - risky but fast
              </Button>
              <Button
                variant="outline"
                className="w-full justify-start text-left h-auto py-4"
                onClick={() => makeChoice('Attempt go-around for second chance', 'ending', 'disaster')}
              >
                <span className="font-semibold">Option C:</span> Attempt go-around for another approach - fuel critical
              </Button>
            </div>
          </div>
        )}

        {/* Ending Screen */}
        {game.state === 'ending' && (
          <div className="space-y-6">
            {game.outcome === 'success' && (
              <>
                <div className="flex items-center gap-3">
                  <CheckCircle className="w-12 h-12 text-green-600" />
                  <h2 className="text-3xl font-bold text-green-600">Success!</h2>
                </div>
                <p className="text-lg text-gray-700">
                  {game.difficulty === 'easy'
                    ? 'Excellent work! You made smart decisions and brought everyone home safely. All 247 passengers and crew are grateful.'
                    : 'Incredible flying under extreme pressure! You executed a perfect emergency landing with minimal margin for error. All 247 passengers and crew owe their lives to your skill.'}
                </p>
              </>
            )}

            {game.outcome === 'crash' && (
              <>
                <div className="flex items-center gap-3">
                  <XCircle className="w-12 h-12 text-yellow-600" />
                  <h2 className="text-3xl font-bold text-yellow-600">Crash Landing</h2>
                </div>
                <p className="text-lg text-gray-700">
                  {game.difficulty === 'easy'
                    ? 'The landing was rough but controlled. Emergency services are on scene. Most passengers walk away, some with minor injuries. You saved the day.'
                    : 'The aircraft hits hard. Significant damage, but emergency services respond quickly. Most passengers survive, though some are injured. Your decisions saved lives.'}
                </p>
              </>
            )}

            {game.outcome === 'disaster' && (
              <>
                <div className="flex items-center gap-3">
                  <XCircle className="w-12 h-12 text-red-600" />
                  <h2 className="text-3xl font-bold text-red-600">Catastrophic Failure</h2>
                </div>
                <p className="text-lg text-gray-700">
                  {game.difficulty === 'easy'
                    ? 'Your decision to attempt another approach was too risky. Fuel ran out before you could land safely. The outcome was tragic.'
                    : 'Fuel ran out mid-go-around. The aircraft lost altitude rapidly. Despite your efforts, the outcome was tragic. Sometimes there are no good choices.'}
                </p>
              </>
            )}

            <div className="bg-gray-100 p-4 rounded-lg">
              <p className="text-sm font-semibold text-gray-900 mb-2">Your Decisions:</p>
              <ul className="text-sm text-gray-700 space-y-1">
                {game.decisions.map((decision, idx) => (
                  <li key={idx}>
                    {idx + 1}. {decision}
                  </li>
                ))}
              </ul>
            </div>

            <Button size="lg" onClick={restart} className="w-full bg-blue-600 hover:bg-blue-700 text-white text-lg">
              Play Again
            </Button>
          </div>
        )}
      </Card>
    </div>
  );
}
