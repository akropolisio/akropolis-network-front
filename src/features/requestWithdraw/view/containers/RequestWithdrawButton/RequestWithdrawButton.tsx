import * as React from 'react';

import { tKeys as tKeysAll, useTranslate } from 'services/i18n';

import { Button } from 'shared/view/elements';
import { Modal, ErrorModal } from 'shared/view/components';
import { Request } from 'shared/view/elements/Icons';

import RequestWithdrawForm from '../RequestWithdrawForm/RequestWithdrawForm';
import { StylesProps, provideStyles } from './RequestWithdrawButton.style';

const tKeys = tKeysAll.features.requestWithdraw;

type IProps = StylesProps;

function RequestWithdrawButton(props: IProps) {
  const { classes } = props;
  const [isOpened, setIsOpened] = React.useState(false);
  const [hasError, setHasError] = React.useState(false);

  const { t } = useTranslate();

  const handleIsOpenedChanging = React.useCallback((opened: boolean) => {
    setIsOpened(opened);
  }, []);

  const closeModal = handleIsOpenedChanging.bind(null, false);

  const handleErrorChanging = React.useCallback((withError: boolean) => {
    setHasError(withError);
  }, []);

  return (
    <>
      <Button variant="contained" color="secondary" onClick={handleIsOpenedChanging.bind(null, true)}>
        <Request className={classes.buttonIcon} />
        {t(tKeys.button.getKey())}
      </Button>
      {!hasError && (
        <Modal
          size="large"
          isOpen={isOpened}
          title={t(tKeys.form.title.getKey())}
          onClose={closeModal}
        >
          <RequestWithdrawForm
            onSuccess={closeModal}
            onError={handleErrorChanging.bind(null, true)}
            onCancel={closeModal}
          />
        </Modal>
      )}
      {!!hasError && (
        <ErrorModal
          isOpened={isOpened}
          onClose={closeModal}
          onRetry={handleErrorChanging.bind(null, false)}
        />
      )}
    </>
  );
}

export default provideStyles(RequestWithdrawButton);