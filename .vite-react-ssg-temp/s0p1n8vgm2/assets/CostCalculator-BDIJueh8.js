import { jsx, jsxs, Fragment } from "react/jsx-runtime";
import { c as cn, u as useLanguage, B as Button, C as Card, g as CardContent, S as Seo, L as Layout } from "../main.mjs";
import * as React from "react";
import { useState } from "react";
import { I as Input } from "./input-6XZgwDxx.js";
import * as RadioGroupPrimitive from "@radix-ui/react-radio-group";
import { Circle } from "lucide-react";
import { L as Label } from "./label-CtFE5ecu.js";
import { Slot } from "@radix-ui/react-slot";
import { FormProvider, Controller, useFormContext, useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import "vite-react-ssg";
import "react-router-dom";
import "react-fast-compare";
import "invariant";
import "shallowequal";
import "class-variance-authority";
import "clsx";
import "tailwind-merge";
import "@supabase/supabase-js";
import "@radix-ui/react-toast";
import "@radix-ui/react-dialog";
import "@tanstack/react-query";
import "@radix-ui/react-label";
const RadioGroup = React.forwardRef(({ className, ...props }, ref) => {
  return /* @__PURE__ */ jsx(
    RadioGroupPrimitive.Root,
    {
      className: cn("grid gap-2", className),
      ...props,
      ref
    }
  );
});
RadioGroup.displayName = RadioGroupPrimitive.Root.displayName;
const RadioGroupItem = React.forwardRef(({ className, ...props }, ref) => {
  return /* @__PURE__ */ jsx(
    RadioGroupPrimitive.Item,
    {
      ref,
      className: cn(
        "aspect-square h-4 w-4 rounded-full border border-primary text-primary ring-offset-background focus:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50",
        className
      ),
      ...props,
      children: /* @__PURE__ */ jsx(RadioGroupPrimitive.Indicator, { className: "flex items-center justify-center", children: /* @__PURE__ */ jsx(Circle, { className: "h-2.5 w-2.5 fill-current text-current" }) })
    }
  );
});
RadioGroupItem.displayName = RadioGroupPrimitive.Item.displayName;
const Form = FormProvider;
const FormFieldContext = React.createContext(
  {}
);
const FormField = ({
  ...props
}) => {
  return /* @__PURE__ */ jsx(FormFieldContext.Provider, { value: { name: props.name }, children: /* @__PURE__ */ jsx(Controller, { ...props }) });
};
const useFormField = () => {
  const fieldContext = React.useContext(FormFieldContext);
  const itemContext = React.useContext(FormItemContext);
  const { getFieldState, formState } = useFormContext();
  const fieldState = getFieldState(fieldContext.name, formState);
  if (!fieldContext) {
    throw new Error("useFormField should be used within <FormField>");
  }
  const { id } = itemContext;
  return {
    id,
    name: fieldContext.name,
    formItemId: `${id}-form-item`,
    formDescriptionId: `${id}-form-item-description`,
    formMessageId: `${id}-form-item-message`,
    ...fieldState
  };
};
const FormItemContext = React.createContext(
  {}
);
const FormItem = React.forwardRef(({ className, ...props }, ref) => {
  const id = React.useId();
  return /* @__PURE__ */ jsx(FormItemContext.Provider, { value: { id }, children: /* @__PURE__ */ jsx("div", { ref, className: cn("space-y-2", className), ...props }) });
});
FormItem.displayName = "FormItem";
const FormLabel = React.forwardRef(({ className, ...props }, ref) => {
  const { error, formItemId } = useFormField();
  return /* @__PURE__ */ jsx(
    Label,
    {
      ref,
      className: cn(error && "text-destructive", className),
      htmlFor: formItemId,
      ...props
    }
  );
});
FormLabel.displayName = "FormLabel";
const FormControl = React.forwardRef(({ ...props }, ref) => {
  const { error, formItemId, formDescriptionId, formMessageId } = useFormField();
  return /* @__PURE__ */ jsx(
    Slot,
    {
      ref,
      id: formItemId,
      "aria-describedby": !error ? `${formDescriptionId}` : `${formDescriptionId} ${formMessageId}`,
      "aria-invalid": !!error,
      ...props
    }
  );
});
FormControl.displayName = "FormControl";
const FormDescription = React.forwardRef(({ className, ...props }, ref) => {
  const { formDescriptionId } = useFormField();
  return /* @__PURE__ */ jsx(
    "p",
    {
      ref,
      id: formDescriptionId,
      className: cn("text-sm text-muted-foreground", className),
      ...props
    }
  );
});
FormDescription.displayName = "FormDescription";
const FormMessage = React.forwardRef(({ className, children, ...props }, ref) => {
  const { error, formMessageId } = useFormField();
  const body = error ? String(error == null ? void 0 : error.message) : children;
  if (!body) {
    return null;
  }
  return /* @__PURE__ */ jsx(
    "p",
    {
      ref,
      id: formMessageId,
      className: cn("text-sm font-medium text-destructive", className),
      ...props,
      children: body
    }
  );
});
FormMessage.displayName = "FormMessage";
const FormSchema = z.object({
  disputeAmount: z.coerce.number().min(1, "Amount must be greater than 0"),
  arbitrators: z.enum(["1", "3"])
});
function CostCalculator() {
  const { t } = useLanguage();
  const [calculationResult, setCalculationResult] = useState(null);
  const form = useForm({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      disputeAmount: 0,
      arbitrators: "3"
    }
  });
  const calculateArbitrationFee = (amount, arbitrators) => {
    let fee = 0;
    if (amount <= 2e4) {
      fee = 3e3;
    } else if (amount <= 5e4) {
      fee = 4500;
    } else if (amount <= 1e5) {
      fee = 6500;
    } else if (amount <= 25e4) {
      fee = 3200 + amount * 0.04;
    } else if (amount <= 5e5) {
      fee = 7e3 + amount * 0.03;
    } else if (amount <= 1e6) {
      fee = 11500 + amount * 0.02;
    } else if (amount <= 3e6) {
      fee = 14500 + amount * 0.01;
    } else if (amount <= 5e6) {
      fee = 17750 + amount * 7e-3;
    } else if (amount <= 1e7) {
      fee = 27500 + amount * 525e-5;
    } else if (amount <= 5e7) {
      fee = 47500 + amount * 2e-3;
    } else {
      fee = 101500 + amount * 1e-3;
    }
    if (arbitrators === "1") {
      fee = fee * 0.8;
    }
    return fee;
  };
  const onSubmit = (data) => {
    const baseAmount = calculateArbitrationFee(data.disputeAmount, data.arbitrators);
    const vatAmount = baseAmount * 0.21;
    const totalAmount = baseAmount + vatAmount;
    setCalculationResult({
      baseAmount,
      vatAmount,
      totalAmount
    });
  };
  return /* @__PURE__ */ jsxs("div", { className: "space-y-6", children: [
    /* @__PURE__ */ jsx(Form, { ...form, children: /* @__PURE__ */ jsxs("form", { onSubmit: form.handleSubmit(onSubmit), className: "space-y-6", children: [
      /* @__PURE__ */ jsxs("div", { className: "grid grid-cols-1 md:grid-cols-3 gap-4", children: [
        /* @__PURE__ */ jsx("div", { className: "md:col-span-2", children: /* @__PURE__ */ jsx(
          FormField,
          {
            control: form.control,
            name: "disputeAmount",
            render: ({ field }) => /* @__PURE__ */ jsxs(FormItem, { children: [
              /* @__PURE__ */ jsx(FormLabel, { htmlFor: "dispute-amount", className: "text-sm font-medium text-gray-700", children: t("arbitration.calculator.amount") }),
              /* @__PURE__ */ jsx(FormControl, { children: /* @__PURE__ */ jsx(
                Input,
                {
                  id: "dispute-amount",
                  type: "number",
                  min: "0",
                  className: "w-full",
                  ...field,
                  onChange: (e) => field.onChange(e.target.valueAsNumber)
                }
              ) })
            ] })
          }
        ) }),
        /* @__PURE__ */ jsx("div", { className: "flex items-end", children: /* @__PURE__ */ jsx(
          Button,
          {
            type: "submit",
            className: "w-full bg-eac-primary hover:bg-eac-primary/90 rounded-full",
            children: t("arbitration.calculator.submitBtn")
          }
        ) })
      ] }),
      /* @__PURE__ */ jsx(
        FormField,
        {
          control: form.control,
          name: "arbitrators",
          render: ({ field }) => /* @__PURE__ */ jsxs(FormItem, { className: "space-y-3", children: [
            /* @__PURE__ */ jsx(FormLabel, { children: t("arbitration.calculator.composition") }),
            /* @__PURE__ */ jsx(FormControl, { children: /* @__PURE__ */ jsxs(
              RadioGroup,
              {
                onValueChange: field.onChange,
                defaultValue: field.value,
                className: "flex flex-col space-y-1 sm:flex-row sm:space-x-4 sm:space-y-0",
                children: [
                  /* @__PURE__ */ jsxs("div", { className: "flex items-center space-x-2", children: [
                    /* @__PURE__ */ jsx(RadioGroupItem, { value: "1", id: "r1" }),
                    /* @__PURE__ */ jsx(Label, { htmlFor: "r1", children: t("arbitration.calculator.oneArbitrator") })
                  ] }),
                  /* @__PURE__ */ jsxs("div", { className: "flex items-center space-x-2", children: [
                    /* @__PURE__ */ jsx(RadioGroupItem, { value: "3", id: "r3" }),
                    /* @__PURE__ */ jsx(Label, { htmlFor: "r3", children: t("arbitration.calculator.threeArbitrators") })
                  ] })
                ]
              }
            ) })
          ] })
        }
      )
    ] }) }),
    calculationResult && /* @__PURE__ */ jsx(Card, { className: "border-eac-primary", children: /* @__PURE__ */ jsxs(CardContent, { className: "pt-6", children: [
      /* @__PURE__ */ jsx("h3", { className: "text-lg font-medium mb-4", children: t("arbitration.calculator.costs") }),
      /* @__PURE__ */ jsxs("div", { className: "grid grid-cols-1 sm:grid-cols-3 gap-4", children: [
        /* @__PURE__ */ jsxs("div", { children: [
          /* @__PURE__ */ jsx("p", { className: "text-sm text-gray-500", children: t("arbitration.calculator.fee") }),
          /* @__PURE__ */ jsxs("p", { className: "font-medium", children: [
            "€",
            calculationResult.baseAmount.toFixed(2),
            " ",
            t("arbitration.calculator.exclVAT")
          ] }),
          /* @__PURE__ */ jsx("p", { className: "text-sm text-gray-500 mt-3", children: t("arbitration.calculator.vat") }),
          /* @__PURE__ */ jsxs("p", { className: "font-medium", children: [
            "€",
            calculationResult.vatAmount.toFixed(2)
          ] })
        ] }),
        /* @__PURE__ */ jsxs("div", { children: [
          /* @__PURE__ */ jsx("p", { className: "text-sm text-gray-500", children: t("arbitration.calculator.total") }),
          /* @__PURE__ */ jsxs("p", { className: "font-medium text-lg text-eac-primary", children: [
            "€",
            calculationResult.totalAmount.toFixed(2),
            " ",
            t("arbitration.calculator.inclVAT")
          ] })
        ] })
      ] }),
      /* @__PURE__ */ jsx("p", { className: "mt-4 text-sm text-gray-500", children: t("arbitration.calculator.estimate") })
    ] }) })
  ] });
}
const CostCalculatorPage = () => {
  const { language, t } = useLanguage();
  return /* @__PURE__ */ jsxs(Fragment, { children: [
    /* @__PURE__ */ jsx(Seo, { title: t("seo.calculator.title"), description: t("seo.calculator.description"), lang: language }),
    /* @__PURE__ */ jsx(Layout, { children: /* @__PURE__ */ jsxs("div", { className: "py-6", children: [
      /* @__PURE__ */ jsx("h1", { className: "text-3xl font-bold mb-6 text-eac-dark uppercase", children: t("arbitration.calculator.title") }),
      /* @__PURE__ */ jsxs("div", { className: "prose max-w-none", children: [
        /* @__PURE__ */ jsx("p", { className: "text-lg text-gray-600 mb-4", children: t("arbitration.calculator.description") }),
        /* @__PURE__ */ jsx("p", { className: "text-lg text-gray-600 mb-4", children: t("arbitration.calculator.registrationFeeTitle") }),
        /* @__PURE__ */ jsxs("ul", { className: "list-disc pl-6 mb-4 text-gray-600", children: [
          /* @__PURE__ */ jsx("li", { children: t("arbitration.calculator.registrationFee.excludingVat") }),
          /* @__PURE__ */ jsx("li", { children: t("arbitration.calculator.registrationFee.includingVat") })
        ] }),
        /* @__PURE__ */ jsx("p", { className: "text-lg text-gray-600", children: t("arbitration.calculator.currencyConversion") })
      ] }),
      /* @__PURE__ */ jsx("div", { className: "py-1 mb-5", children: /* @__PURE__ */ jsx(Button, { asChild: true, children: /* @__PURE__ */ jsx("a", { href: t("arbitration.calculator.exchangeRateUrl"), target: "_blank", rel: "noopener noreferrer", children: t("arbitration.calculator.exchangeRateLink") }) }) }),
      /* @__PURE__ */ jsx(CostCalculator, {})
    ] }) })
  ] });
};
export {
  CostCalculatorPage as default
};
