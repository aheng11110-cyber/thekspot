// ============================================================
// PayPal 결제 버튼 컴포넌트
// ============================================================
// 기존 프로젝트(수익화웹사이트첫걸음, globalaieducation)에서
// 검증된 패턴을 기반으로 제작
//
// 사용법:
//   <PayPalCheckoutButton
//     product={product}
//     onSuccess={(details) => console.log('결제 완료', details)}
//     onError={(err) => console.error(err)}
//   />
// ============================================================

import React from 'react';
import { PayPalButtons } from '@paypal/react-paypal-js';
import type { PayPalProduct } from '../../lib/paypal';
import { BRAND_NAME, SITE_CONTENT } from '../../config/content';
import { useLanguage } from '../../contexts/LanguageContext';

interface PayPalCheckoutButtonProps {
  product: PayPalProduct;
  onSuccess: (details: any) => void;
  onError?: (error: any) => void;
  onCancel?: () => void;
}

const PayPalCheckoutButton: React.FC<PayPalCheckoutButtonProps> = ({
  product,
  onSuccess,
  onError,
  onCancel,
}) => {
  const { lang } = useLanguage();
  const t = SITE_CONTENT[lang].pricing;

  const createOrderParams = (_data: any, actions: any) => {
    return actions.order.create({
      intent: 'CAPTURE',
      purchase_units: [
        {
          description: product.description,
          custom_id: product.id,
          amount: {
            currency_code: product.currency,
            value: product.price,
            breakdown: {
              item_total: {
                currency_code: product.currency,
                value: product.price,
              },
            },
          },
          items: [
            {
              name: product.name,
              unit_amount: {
                currency_code: product.currency,
                value: product.price,
              },
              quantity: '1',
              category: 'DIGITAL_GOODS' as const,
            },
          ],
        },
      ],
      application_context: {
        brand_name: BRAND_NAME,
        shipping_preference: 'NO_SHIPPING' as const,
        user_action: 'PAY_NOW' as const,
      },
    });
  };

  const onApproveHandler = async (_data: any, actions: any) => {
    if (actions.order) {
      const details = await actions.order.capture();
      onSuccess(details);
    }
  };

  const onErrorHandler = (err: any) => {
    console.error('[PayPal] Error:', err);
    onError?.(err);
  };

  return (
    <div className="w-full max-w-md mx-auto">
      <PayPalButtons
        forceReRender={[lang]}
        style={{
          layout: 'vertical',
          color: 'gold',
          shape: 'rect',
          label: 'paypal',
          height: 48,
          tagline: false,
        }}
        createOrder={createOrderParams}
        onApprove={onApproveHandler}
        onError={onErrorHandler}
        onCancel={() => onCancel?.()}
      />
    </div>
  );
};

export default PayPalCheckoutButton;
