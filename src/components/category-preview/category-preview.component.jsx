import ProductCard from '../product-card/product-card.component';
import { CategoryPreviewContainer, Title, Preview } from './category-preview.styles';

const CategoryPreview = ({ category, products }) => {
    return (
        <CategoryPreviewContainer>
            <h2>
                <Title to={category}>{category.toUpperCase()}</Title>
            </h2>
            <Preview>
                {
                    products
                    .filter((_, index) => index < 4)
                    .map((product) => (
                        <ProductCard key={product.id} product={product} />
                    ))
                }
            </Preview>
        </CategoryPreviewContainer>
    );
};

export default CategoryPreview;