import { FiCheck } from 'react-icons/fi';

interface Plan {
  id: string;
  name: string;
  price: number;
  currency: string;
  interval: string;
  features: string[];
  highlighted?: boolean;
  current?: boolean;
}

interface PlanCardProps {
  plan: Plan;
  children: React.ReactNode;
}

const PlanCard = ({ plan, children }: PlanCardProps) => {
  return (
    <div
      className={`
        relative bg-white rounded-2xl border p-6 sm:p-8 flex flex-col transition-all duration-200
        ${plan.highlighted
          ? 'border-[#2563EB] shadow-lg shadow-blue-500/10 scale-[1.02] z-10'
          : 'border-[#E5E7EB] hover:shadow-md'
        }
      `}
    >
      {/* Popular Badge */}
      {plan.highlighted && (
        <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-4 py-1 bg-gradient-to-r from-[#2563EB] to-[#4F46E5] text-white rounded-full text-xs font-bold shadow-md">
          Most Popular
        </div>
      )}

      {/* Plan Name */}
      <h3 className="text-lg sm:text-xl font-bold text-[#111827] mb-1">{plan.name}</h3>
      <p className="text-sm text-[#6B7280] mb-5">For {plan.name === 'Starter' ? 'individuals' : plan.name === 'Pro' ? 'growing teams' : 'agencies & enterprises'}</p>

      {/* Price */}
      <div className="mb-6">
        <span className="text-3xl sm:text-4xl font-bold text-[#111827]">${plan.price}</span>
        <span className="text-[#9CA3AF] text-sm">/{plan.interval}</span>
      </div>

      {/* CTA Button */}
      <div className="mb-6">{children}</div>

      {/* Features List */}
      <ul className="space-y-3 flex-1">
        {plan.features.map((feature) => (
          <li key={feature} className="flex items-start gap-2.5">
            <FiCheck className="w-4 h-4 text-[#22C55E] flex-shrink-0 mt-0.5" />
            <span className="text-sm text-[#374151]">{feature}</span>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default PlanCard;