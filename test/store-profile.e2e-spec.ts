import { test, expect } from '@playwright/test';

test('update profile', async ({ page }) => {
    await page.goto('/', { waitUntil: 'networkidle' })

    await page.getByRole('button', { name: 'Pizza Shop' }).click()
    await page.getByText('Perfil da loja').click()

    await page.getByLabel('Nome').fill('Rocket Pizza')
    await page.getByLabel('Descrição').fill('Another description')

    await page.getByRole('button', { name: 'Salvar' }).click()

    await page.waitForLoadState('networkidle')

    const toast = page.getByText('Perfil atualizado com sucesso!')

    await expect(toast).toBeVisible()

    await page.getByRole('button', { name: 'Close', exact: true }).click()

    await page.waitForTimeout(300)

    await expect(page.getByRole('button', { name: 'Rocket Pizza' })).toBeVisible()
});