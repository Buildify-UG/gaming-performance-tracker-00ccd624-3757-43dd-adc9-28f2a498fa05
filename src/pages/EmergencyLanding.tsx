import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { AlertTriangle, Plane, CheckCircle, XCircle } from 'lucide-react';

type GameState = 'intro' | 'scenario1' | 'scenario2' | 'scenario3' | 'ending';
type Outcome = 'success' | 'crash' | 'disaster' | null;

interface GameProgress {
  state: GameState;
  outcome: Outcome;
  decisions: string[];
  stats: {
    altitude: number;
    fuel: number;
    engineStatus: number;
  };
}

export function EmergencyLanding() {
  const [game, setGame] = useState<GameProgress>({
    state: 'intro',
    outcome: null,
    decisions: [],
    stats: {
      altitude: 35000,
      fuel: 50,
      engineStatus: 100,
    },
  });

  const makeChoice = (choice: string, nextState: GameState, outcome?: Outcome) => {
    setGame((prev) => ({
      ...prev,
      state: nextState,
      outcome: outcome || prev.outcome,
      decisions: [...prev.decisions, choice],
      stats:
        nextState === 'scenario1'
          ? { altitude: 25000, fuel: 45, engineStatus: 60 }
          : nextState === 'scenario2'
            ? {
                altitude: prev.stats.altitude - 5000,
                fuel: prev.stats.fuel - 10,
                engineStatus: prev.stats.engineStatus - 20,
              }
            : prev.stats,
    }));
  };

  const restart = () => {
    setGame({
      state: 'intro',
      outcome: null,
      decisions: [],
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
                  Brilliant flying! You executed a perfect emergency landing. All 247 passengers and crew are safe. You're a hero.
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
                  The aircraft hits hard. Significant damage, but emergency services respond quickly. Most passengers survive, though some are injured. Your decisions saved lives.
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
                  Fuel ran out mid-go-around. The aircraft lost altitude rapidly. Despite your efforts, the outcome was tragic. Sometimes there are no good choices.
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
