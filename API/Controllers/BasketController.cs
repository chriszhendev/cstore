using API.Data;
using API.DTOs;
using API.Entities;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace API.Controllers
{
    public class BasketController : BaseApiController
    {
        private readonly StoreContext _context;
        
        public BasketController(StoreContext context)
        {
            _context = context;
            
        }


        [HttpPost]
        public async Task<ActionResult<BasketDTO>> AddItemToBasket(int productId,  int quantity){

            //get || create basket
            var basket = await RetrieveBasket();
            if(basket == null) basket = CreateBasket();

            //get product
            var product = await _context.Products.FindAsync(productId);
            if(product == null) return NotFound();

            //add item to basket
            basket.AddItem(product, quantity);

            var result = await _context.SaveChangesAsync() > 0;

            if(result) return CreatedAtRoute("GetBasket", MapBasketToDTO(basket));

        
            return BadRequest(new ProblemDetails{Title="Problem saving item to basket"});
        }


        [HttpDelete]
        public async Task<ActionResult> RemoveBasketItem(int productId, int quantity){
            var basket = await RetrieveBasket();

            if (basket == null) return NotFound();

            basket.RemoveItem(productId, quantity);

            var result = await _context.SaveChangesAsync() > 0;

            if(result)return Ok();

            return BadRequest(new ProblemDetails{Title="Problem removing item from basket"});
        }

        [HttpGet(Name ="GetBasket")]
        public async Task<ActionResult<BasketDTO>> GetBasket()
        {
            var basket = await RetrieveBasket();

            if (basket == null) return null;
            return MapBasketToDTO(basket);
        }


        private Basket CreateBasket()
        {
            var buyerId = Guid.NewGuid().ToString();
            var cookieOptions = new CookieOptions{IsEssential = true, Expires=DateTime.Now.AddDays(30)};
            Response.Cookies.Append("buyerId", buyerId, cookieOptions);
            var basket = new Basket{BuyerId = buyerId};
            _context.Baskets.Add(basket);
            return basket;
        }


        private async Task<Basket> RetrieveBasket()
        {
            return await _context.Baskets
            .Include(i => i.Items)
            .ThenInclude(p => p.Product)
            .FirstOrDefaultAsync(x => x.BuyerId == Request.Cookies["buyerId"]);
        }

        private BasketDTO MapBasketToDTO(Basket basket)
        {
            return new BasketDTO
            {
                Id = basket.id,
                BuyerId = basket.BuyerId,
                Items = basket.Items.Select(item => new BasketItemDTO
                {
                    ProductId = item.ProductId,
                    Name = item.Product.Name,
                    Price = item.Product.Price,
                    PictureUrl = item.Product.PictureUrl,
                    Type = item.Product.Type,
                    Brand = item.Product.Brand,
                    Quantity = item.Quantity
                }).ToList()
            };
        }
    }
}