export type Project = {
  title: string;
  description: string;
  tags: string[];
  href?: string; // live demo
  repo?: string; // source code
};

export const projects: Project[] = [
  {
    title: "EasyPay",
    description:
      "An internal expense-filing platform built at Shadowfax to replace Happay, whose slow turnaround on customisation requests and missing controls — no duplicate-invoice or duplicate-expense checks, weak location-mapping and access controls — were costing the company ~₹2.5 Cr/year in admin leakage. Designed approval workflows and decision trees for multiple user scenarios, added automated fraud checks, and built self-serve tools like location-mapping request tickets. Projected to save ~₹1 Cr in admin expense and ₹1.5 lakh in licensing fees annually.",
    tags: ["Product Management", "FinTech", "Workflow Automation"],
  },
];
